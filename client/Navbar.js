import { Link } from 'react-router-dom'
import useAuth from './src/hooks/useAuth'
import NavbarLink from './src/components/NavbarLink'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NavbarHamburgerLink from './src/components/NavbarHamburgerLink'

const navigation = [
  { name: 'Submissions', path: '/submissions' },
  { name: 'Vendors', path: '/vendors' },
  { name: 'Form', path: '/form' },
  { name: 'Settings', path: '/settings' },
]

const Navbar = ({ title, user }) => {
  const { logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      {/* Navbar */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {user && (
          <div className="hidden md:flex md:gap-x-12">
            {navigation.map((item) => (
              <NavbarLink key={item.name} text={item.name} path={item.path} />
            ))}
          </div>
        )}
        {/* Navbar Links */}

        {/* Login / Logout */}
        <div className="hidden md:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Link
              className="text-sm font-semibold leading-6 text-gray-900"
              to={'/'}
              onClick={logout}
            >
              Log out
            </Link>
          ) : (
            <Link
              to={'/login'}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavbarHamburgerLink
                    key={item.name}
                    text={item.name}
                    path={item.path}
                    toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                  />
                ))}
              </div>
              <div className="py-6">
                <NavbarHamburgerLink
                  text={'Log in'}
                  path="/login"
                  toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Navbar
