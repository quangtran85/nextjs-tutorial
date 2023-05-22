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

import { state as authState } from '../../services/auth';

export default function Bar() {
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
          {
            authState.value.profile && (
              <>
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                  Welcome {authState.value.profile.firstName}!
              </Typography>
              <LogoutLink />
              </>
            )
          }
          {
            !authState.value.profile && (
              <>
              <Link
                  href="/sign-up"
                  title="Register"
                  sx={{ color: 'white', marginLeft: '10px' }}
              >
                  Register
              </Link>
              <Link
                href="/sign-in"
                title="Register"
                sx={{ color: 'white', marginLeft: '10px' }}
              >
                Login
              </Link>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
