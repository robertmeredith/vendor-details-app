import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavbarLink = ({ path, text }) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={path}
      className={`text-sm font-semibold leading-6 hover:scale-x-105 transition
        ${pathname === path ? ' text-indigo-800' : ' text-gray-900'}`}
      aria-current={pathname === { path } ? 'page' : null}
    >
      {text}
    </Link>
  )
}

export default NavbarLink
