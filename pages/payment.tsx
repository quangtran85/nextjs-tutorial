import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, TextField, Button } from '@mui/material';
import { order } from '../services/inventory';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { state as authState } from '../services/auth'
import { Book } from '../services/api';
import { InferType } from 'yup';

export default function Payment() {
  const router = useRouter();
  const { couponCode } = router.query;

  useEffect(() => {
    if (!authState.value.profile) {
      router.push('/sign-in');
    }
  }, [router]);
  const validationSchema = Yup.object().shape({
    creditCardNumber: Yup.string()
      .required('Credit Card Number is required'),
  });

  const [items, setItems] = useState<Record<'bookId', string>[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartBooks');
    if (storedCart) {
      const cartBooks: Book[] = JSON.parse(storedCart);
      const items = cartBooks.map((book) => ({ bookId: book.id }));
      setItems(items);
    }
  }, []);

  type Form = InferType<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    const paymentData = {
      items: items,
      creditCardNumber: data.creditCardNumber,
      couponCode: couponCode as string,
    };

    order(paymentData)
      .then(() => {
        localStorage.removeItem('cartBooks');
        router.push('/thanks');
      })
      .catch((error) => {
        // Handle the error
        toast.dismiss();
        toast.error(error.message)
      });
  };

  if (!authState.value.profile) {
    return null;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" sx={{ color: '#0066ff', mb: 2 }}>
        Billing Information
      </Typography>
      <TextField
        id="credit-card-input"
        label="Credit Card Number"
        variant="outlined"
        fullWidth
        {...register('creditCardNumber')}
        error={!!errors['creditCardNumber']}
        helperText={errors['creditCardNumber'] ? errors['creditCardNumber'].message : ''}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit Order
      </Button>
    </Box>
  );
}
