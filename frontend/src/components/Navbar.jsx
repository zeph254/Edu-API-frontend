import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, AcademicCapIcon, BookOpenIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";

const navigation = [
  { name: 'Dashboard', href: '#', icon: AcademicCapIcon, current: true },
  { name: 'Classes', href: '#', icon: UsersIcon, current: false },
  { name: 'Lessons', href: '#', icon: BookOpenIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarDaysIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ theme = "blue" }) {
  const themes = {
    gray: {
      bg: "bg-gradient-to-r from-gray-700 to-gray-800",
      text: "text-gray-100",
      hover: "hover:bg-gray-600 hover:text-white",
      active: "bg-gray-600 text-white",
      border: "border-gray-600",
      ring: "ring-gray-500",
      logo: "filter brightness-125"
    },
    blue: {
      bg: "bg-gradient-to-r from-blue-600 to-blue-800",
      text: "text-blue-100",
      hover: "hover:bg-blue-500 hover:text-white",
      active: "bg-blue-500 text-white",
      border: "border-blue-500",
      ring: "ring-blue-400",
      logo: "filter brightness-125"
    },
    maroon: {
      bg: "bg-gradient-to-r from-red-800 to-red-900",
      text: "text-red-100",
      hover: "hover:bg-red-700 hover:text-white",
      active: "bg-red-700 text-white",
      border: "border-red-700",
      ring: "ring-red-600",
      logo: "filter brightness-110"
    },
  };

  const currentTheme = themes[theme] || themes.blue;

  return (
    <Disclosure as="nav" className={`${currentTheme.bg} ${currentTheme.text} shadow-xl`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className={`relative inline-flex items-center justify-center rounded-md p-2 ${currentTheme.text} ${currentTheme.hover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${currentTheme.ring}`}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-7 w-7 group-data-open:hidden" />
              <XMarkIcon className="hidden h-7 w-7 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo and Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  alt="School Logo"
                  src="https://kammalandprimary.co.za/wp-content/uploads/2021/04/Logo-1-1.png"
                  className={`h-12 w-auto ${currentTheme.logo}`}
                />
                <span className="text-2xl font-bold tracking-tight text-white">Kambata Primary</span>
              </Link>
            </div>

            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current 
                          ? `${currentTheme.active} shadow-md` 
                          : `${currentTheme.text} ${currentTheme.hover}`,
                        "group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <Icon className={`mr-2 h-5 w-5 flex-shrink-0 ${item.current ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notification & Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button 
              type="button" 
              className={`relative rounded-full p-2 ${currentTheme.text} ${currentTheme.hover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${currentTheme.ring}`}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${currentTheme.ring}">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-9 w-9 rounded-full border-2 border-white/30"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Profile"
                />
              </MenuButton>

              <MenuItems 
                className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition-all duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[open]:scale-100 data-[open]:opacity-100`}
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="truncate text-sm text-gray-500">Teacher</p>
                </div>
                
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to="#" 
                        className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to="#" 
                        className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </Link>
                    )}
                  </MenuItem>
                </div>
                
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to="#" 
                        className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Sign out
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>

        {/* Mobile Menu */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current 
                      ? `${currentTheme.active} text-white shadow-md` 
                      : `${currentTheme.text} ${currentTheme.hover}`,
                    "group flex items-center rounded-md px-3 py-3 text-base font-medium transition-colors duration-200"
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <Icon className={`mr-3 h-6 w-6 flex-shrink-0 ${item.current ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}