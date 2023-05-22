import { Link } from '@mui/material'
import { logout } from '../../services/auth';
import { useRouter } from 'next/navigation';

export default function LogoutLink() {
  const { push } = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      push('/sign-in');
    });
  }

  return (
    <Link
      href={'#'}
      onClick={handleLogout}
      sx={{ color: 'white', marginLeft: '10px' }}
    >
      Logout
    </Link>
  )
}
