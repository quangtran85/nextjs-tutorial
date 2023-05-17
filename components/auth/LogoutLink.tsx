import { Link } from '@mui/material'

export default function LogoutLink() {
  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    alert('logout!')
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
