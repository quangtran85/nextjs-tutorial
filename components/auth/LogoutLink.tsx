import { Link } from '@mui/material'
import helpers from '../../utils/helpers'

export default function LogoutLink() {
  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    helpers.userLogout()
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
