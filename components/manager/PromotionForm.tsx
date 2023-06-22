import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { createPromotion } from '../../services/inventory';
import { InferType } from 'yup';

export default function PromotionForm() {
  const validationSchema = Yup.object().shape({
    percentDiscount: Yup.number()
      .typeError('Percentage Discount must be a number')
      .required('Percentage Discount is required')
      .integer('Percentage Discount must be an integer')
      .moreThan(0, 'Percentage Discount must be greater than or equal to 1')
      .max(100, 'Percentage Discount must be less than or equal to 100'),
    expirationDate: Yup.date()
      .typeError('Expiration Date must be a valid date')
      .required('Expiration Date is required')
      .min(new Date(), 'Expiration Date must be in the future'),
  });

  type Form = InferType<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Form reset function
  } = useForm<Form>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSave = (data: Form) => {
    createPromotion(data)
      .then(() => {
        toast.success('Promotion added successfully!');
        reset(); // Reset the form after adding a promotion
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
            <Typography variant="h5" sx={{ color: '#0066ff' }}>
              Add Promotion
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <form onSubmit={handleSubmit(handleSave)}>
              <TextField
                required
                label="Percentage Discount"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('percentDiscount')}
                error={!!errors.percentDiscount}
                helperText={errors.percentDiscount?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                label="Expiration Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('expirationDate')}
                error={!!errors.expirationDate}
                helperText={errors.expirationDate?.message}
                sx={{ mb: 2 }}
              />

              <Button type="submit" variant="contained">
                Add
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
