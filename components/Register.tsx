import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createAccount } from '../services/account';
import { InferType } from 'yup';

export default function Register() {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    email: Yup.string().email("Email Incorrect format").required("Email is required"),
    address: Yup.string().optional(),
    city: Yup.string().optional(),
    state: Yup.string().optional(),
    zipCode: Yup.string().optional(),
    isMember: Yup.boolean().optional(),
  });

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

  const { push } = useRouter();
  const onSubmit = async (data: any) => {
    createAccount(data).then(() => {
      toast.dismiss();
      toast.success('Register successful')
      push('/');
    }).catch(({ message }) => {
      toast.dismiss();
      toast.error(message);
    })
  };

  return (
    <Grid container spacing={0} alignItems={'center'} justifyContent={'center'}>
      <Grid maxWidth={'sm'}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  {...register('username')}
                  error={!!errors['username']}
                  helperText={errors['username'] ? errors['username'].message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register('password')}
                  error={!!errors['password']}
                  helperText={errors['password'] ? errors['password'].message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  error={!!errors['confirmPassword']}
                  helperText={errors['confirmPassword'] ? errors['confirmPassword'].message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  {...register('email')}
                  error={!!errors['email']}
                  helperText={errors['email'] ? errors['email'].message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  autoComplete="address"
                  {...register('address')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  autoComplete="city"
                  {...register('city')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  autoComplete="state"
                  {...register('state')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                  autoComplete="zipCode"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox />} {...register('isMember')} name="isMember" label="I would like to be a BECS member to receive additional discounts " />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
