import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import { AutoStories } from '@mui/icons-material'
import SearchBox from '../Search.jsx'
import LogoutLink from '../auth/LogoutLink'
import helpers from '../../utils/helpers'
import { useEffect, useState } from 'react'

export default function Bar() {
  const [userName, setUserName] = useState(undefined)
  useEffect(() => {
    setUserName(helpers.getUserLogged()?.userName)
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <AutoStories />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', marginRight: '50px' } }}
          >
            BECS
          </Typography>
          <SearchBox />
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {userName === undefined ? '' : 'Welcome,' + userName}
          </Typography>
          {userName === undefined ? <><Link
            href="/sign-up"
            title="Register"
            sx={{ color: 'white', marginLeft: '10px' }}
          >
            Register
          </Link><Link
            href="/sign-in"
            title="Register"
            sx={{ color: 'white', marginLeft: '10px' }}
          >
            Login
          </Link></> : <LogoutLink />}

        </Toolbar>
      </AppBar>
    </>
  )
}
