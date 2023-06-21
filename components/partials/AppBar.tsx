import {
  AppBar,
  Box,
  IconButton,
  Link,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchBox from '../Search.jsx';
import LogoutLink from '../auth/LogoutLink';

import { state as authState, isManager } from '../../services/auth';
import { useRouter } from 'next/router';

export default function Bar() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'add-book') {
      router.push('/add-book');
    } else if (selectedOption === 'add-promotion') {
      router.push('/add-promotion');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <IconButton size="large" edge="start" aria-label="open drawer" sx={{ mr: 2, color: '#fff' }}>
              <AutoStories />
            </IconButton>
          </Link>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block', marginRight: '50px' } }}>
            BECS
          </Typography>
          {isManager() && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <Typography variant="subtitle1" sx={{ color: 'white', marginRight: '5px' }}>
                Manager BECS
              </Typography>
              <Select value={''} onChange={handleSelectChange} sx={{ color: 'white' }}>
                <MenuItem value={'add-book'}>Add Book</MenuItem>
                <MenuItem value={'add-promotion'}>Add Promotion</MenuItem>
              </Select>
            </Box>
          )}
          {isHomePage && <SearchBox />}
          <Box sx={{ flexGrow: 1 }} />
          {authState.value.profile && (
            <>
              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Welcome {isManager() ? 'Manager!' : `${authState.value.profile.username}!`}
              </Typography>
              <LogoutLink />
            </>
          )}
          {!authState.value.profile && (
            <>
              <Link href="/sign-up" title="Register" sx={{ color: 'white', marginLeft: '10px' }}>
                Register
              </Link>
              <Link href="/sign-in" title="Login" sx={{ color: 'white', marginLeft: '10px' }}>
                Login
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
