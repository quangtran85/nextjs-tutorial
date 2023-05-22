import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import request from '../utils/api'
import { REGISTER_LINK, SIGN_IN_LINK } from '../utils/AllLink'
import { useRouter } from 'next/router'

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  rePassword: yup.string().required()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value
    }),
}).required()


export default function Register() {
  const router = useRouter()

  const onSubmit = async (values) => {
    await request.post(REGISTER_LINK, {
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    }).then(function(response) {
      if (response.data) {
        router.push(SIGN_IN_LINK)
      }
    })
      .catch(function(error) {
        console.log(error)
      })
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors['firstName']}
                  helperText={errors['firstName'] ? errors['firstName'].message : ''}
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors['lastName']}
                  helperText={errors['lastName'] ? errors['lastName'].message : ''}
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={!!errors['username']}
                  helperText={errors['username'] ? errors['username'].message : ''}
                  {...register('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors['password']}
                  helperText={errors['password'] ? errors['password'].message : ''}
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rePassword"
                  label="Re-type Password"
                  type="password"
                  id="rePassword"
                  autoComplete="new-password"
                  error={!!errors['rePassword']}
                  helperText={errors['rePassword'] ? errors['rePassword'].message : ''}
                  {...register('rePassword')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="state"
                  label="state"
                  id="state"
                  autoComplete="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="zipCode"
                  label="ZipCode"
                  id="zipCode"
                  autoComplete="zipCode"
                />
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
