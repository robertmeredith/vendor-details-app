import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavbarHamburgerLink = ({ path, text, toggleMenu }) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={path}
      className={
        pathname === path
          ? // ? 'font-medium text-blue-600 md:py-6 dark:text-blue-500'
            '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
          : '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
      }
      aria-current={pathname === { path } ? 'page' : null}
      onClick={toggleMenu}
    >
      {text}
    </Link>
  )
}

export default NavbarHamburgerLink
