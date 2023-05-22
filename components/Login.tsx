import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import request from '../utils/api'
import helpers from '../utils/helpers'
import { LOGIN_LINK } from '../utils/AllLink'
import { useRouter } from 'next/router'

export default function Login() {

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const dataForm = new FormData(event.currentTarget)
    await request.post(LOGIN_LINK, {
      username: dataForm.get('username'),
      password: dataForm.get('password'),
    }).then(function(response) {
      if (response.data) {
        const data = response.data.data
        helpers.storeUserLogged(data)
        helpers.storeAuthToken(data.accessToken, data.refreshToken)
        window.location.href = '/'
      }
    })
      .catch(function(error) {
        console.log(error)
      })
  }

  return (
    <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
      <Grid maxWidth={'sm'}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
