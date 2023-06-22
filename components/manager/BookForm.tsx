import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { editBook, createBook, fetchBookData } from '../../services/inventory';
import { InferType } from 'yup';

export default function BookForm() {
  const router = useRouter();
  const { bookId = undefined } = router.query;
  const isEditing = !!bookId;

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required('Title is required'),
    author: Yup.string()
      .trim()
      .required('Author is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be a positive number'),
    stock: Yup.number()
      .typeError('Stock must be a number')
      .integer('Stock must be an integer')
      .positive('Stock must be a positive number'),
    reOrderThreshold: Yup.number()
      .typeError('Reorder Notification Remain Items must be a number')
      .nullable()
      .integer('Reorder Notification Remain Items must be an integer')
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .default(null),
  });

  type Form = InferType<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Form reset function
  } = useForm<Form>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const [isSaving, setIsSaving] = useState(false); // State to track saving status

  useEffect(() => {
    // Fetch current book data an populate form fields if editing
    if (isEditing) {
      fetchBookData(bookId.toString()).then((bookData) => {
        setValue('title', bookData.title);
        setValue('author', bookData.author);
        setValue('price', bookData.price);
        setValue('stock', bookData.stock);
        setValue('reOrderThreshold', bookData.reOrderThreshold);
      });
    } else {
      // Reset form when adding a new book
      reset();
    }
  }, [isEditing, bookId, setValue, reset]);

  const handleSave = (data: any) => {
    if (isEditing) {
      setIsSaving(true); // Set saving status to true
      editBook(bookId.toString(), data)
        .then(() => {
          setIsSaving(false); // Set saving status to false
          toast.dismiss();
          toast.success('Book edited successfully!');
          router.push('/');
        })
        .catch(({ message }) => {
          setIsSaving(false);
          toast.dismiss();
          toast.error(message.toString());
        });
    } else {
      setIsSaving(true);
      createBook(data)
        .then(() => {
          setIsSaving(false); // Set saving status to false
          toast.dismiss();
          toast.success('Book added successfully!');
          reset(); // Reset form after adding a new book
          router.push('/');
        })
        .catch(({ message }) => {
          setIsSaving(false); // Set saving status to false
          toast.dismiss();
          toast.error(message.toString());
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
            <Typography variant="h5" sx={{ color: '#0066ff' }}>
              {isEditing ? 'Edit Book' : 'Add Book'}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <form onSubmit={handleSubmit(handleSave)}>
              <TextField
                required
                label="Title"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                label="Author"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('author')}
                error={!!errors.author}
                helperText={errors.author?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                label="Price"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                label="Stock"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...register('stock')}
                error={!!errors.stock}
                helperText={errors.stock?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Reorder Notification Remain Items"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...register('reOrderThreshold')}
                error={!!errors.reOrderThreshold}
                helperText={errors.reOrderThreshold?.message}
                sx={{ mb: 2 }}
                fullWidth
              />
              <Button type="submit" variant="contained" disabled={isSaving}>
                {isEditing ? 'Save' : 'Add'}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
