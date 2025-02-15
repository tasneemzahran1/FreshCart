import React, { useContext, useEffect, useState } from 'react'
import style from "./Navbar.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import logo from './../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'
import { Menu, MenuButton, MenuItem, MenuItems } from './../../../node_modules/@headlessui/react'
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from './../../../node_modules/@heroicons/react/20/solid'
export default function Navbar() {
  const [cartID, setCartID] = useState(null)
  let { getLoggedUserCart, setproductCount, productCount } = useContext(cartContext)

  async function getProductsCount() {
    let x = await getLoggedUserCart()
    setCartID(x?.data?.cartId)

  }

  let { userLogin, setuserLogin } = useContext(UserContext)
  function signOut() {
    localStorage.removeItem("userToken")
    setuserLogin(null)
    let exit = useNavigate()
    exit("/login")
  }
  // const navigation = [
  //   { name: 'Dashboard', href: '#', current: true },
  //   { name: 'Team', href: '#', current: false },
  //   { name: 'Projects', href: '#', current: false },
  //   { name: 'Calendar', href: '#', current: false },
  // ]

  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(' ')
  // }


  useEffect(() => {
    if (userLogin) {
      getProductsCount()
    }
  }, [userLogin])

  return <>
    {/* <Disclosure as="nav" className="bg-emerald-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <i aria-hidden="true" className="block size-6 group-data-[open]:hidden fa-solid fa-bars"></i>
              <i aria-hidden="true" className="hidden size-6 group-data-[open]:block fa-solid fa-xmark"></i>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="FreshCart Logo"
                src={logo}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
                
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-emerald-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure> */}



    <nav className="bg-emerald-800 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to='' className="flex items-center space-x-3 rtl:space-x-reverse md:m-auto">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:inline-block md:w-auto" id="navbar-default">
          <ul className="divide-y-2 space-y-3 lg:divide-y-0 lg:space-y-0 font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {userLogin != null ? <>
              <li><Link className='text-white' to="">Home</Link></li>
              <li><Link className='text-white' to="products">Products</Link></li>
              <li><Link className='text-white' to="cart">Cart</Link></li>
              <li><Link className='text-white' to="brands">Brands</Link></li>
              <li><Link className='text-white' to="categories">Categories</Link></li>
              <li><Link className='text-white' to="wishlist">Wishlist</Link></li>
              <li>
                <Link to="cart"><i className="relative mt-3 fa-solid fa-cart-shopping text-white text-2xl me-2">
                  <div className="absolute inline-flex items-center justify-center left-5 -top-2 w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -end-2 dark:border-gray-900">{productCount}</div>
                </i>
                </Link>
              </li>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-emerald-300 hover:bg-black">
                    More Options
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="space-y-3 py-3 text-center">
                    <MenuItem className='block'>
                      <span><Link className='text-black text-center' to="change-password">Change Password</Link></span>
                    </MenuItem>
                    <MenuItem className='block'>
                      <span><Link className=' text-black ' to={`/orders/${cartID}`}>My Orders</Link></span>
                    </MenuItem>
                    <MenuItem className='block'>
                      <span><Link className='text-black' onClick={signOut}>Signout</Link></span>

                    </MenuItem>

                  </div>
                </MenuItems>
              </Menu></>
              : <><li className='text-white'>
                <Link to="login">Login</Link>
              </li>
                <li className='text-white'><Link to="register">Register</Link></li></>}
          </ul>
          {/* <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className='flex gap-4 text-white font-semibold m-auto '>
              {userLogin != null ? <>
                <li className='mt-2'>
                  <Link to="cart"><i className="relative fa-solid fa-cart-shopping text-white text-2xl me-2">
                    <div className="absolute inline-flex items-center justify-center left-5 -top-2 w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -end-2 dark:border-gray-900">{productCount}</div>
                  </i>
                  </Link>
                </li>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-emerald-300 hover:bg-black">
                      More Options
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="space-y-3 py-3 text-center">
                      <MenuItem className='block'>
                        <span><Link className='text-black text-center' to="change-password">Change Password</Link></span>
                      </MenuItem>
                      <MenuItem className='block'>
                        <span><Link className=' text-black ' to={`/orders/${cartID}`}>My Orders</Link></span>
                      </MenuItem>
                      <MenuItem className='block'>
                        <span><Link className='text-black' onClick={signOut}>Signout</Link></span>

                      </MenuItem>

                    </div>
                  </MenuItems>
                </Menu>
              </>
                : <><li>
                  <Link to="login">Login</Link>
                </li>
                  <li><Link to="register">Register</Link></li></>}
            </ul>
          </div> */}
        </div>

      </div>
    </nav >

    {/* <nav className="bg-emerald-800 fixed top-0 left-0 right-0 border-gray-200 z-50 ">
      <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className='flex items-center gap-10 m-auto'>
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Freshcart Logo" />
          </Link>
          {userLogin != null ? <ul className='flex gap-4 font-semibold'>
            <li><Link className='text-white' to="">Home</Link></li>
            <li><Link className='text-white' to="products">Products</Link></li>
            <li><Link className='text-white' to="cart">Cart</Link></li>
            <li><Link className='text-white' to="brands">Brands</Link></li>
            <li><Link className='text-white' to="categories">Categories</Link></li>
            <li><Link className='text-white' to="wishlist">Wishlist</Link></li>
          </ul> : null}
        </div>





        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className='flex gap-4 text-white font-semibold'>
            {userLogin != null ? <>
              <li className='mt-2'>
                <Link to="cart"><i className="relative fa-solid fa-cart-shopping text-white text-2xl me-2">
                  <div className="absolute inline-flex items-center justify-center left-5 -top-2 w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -end-2 dark:border-gray-900">{productCount}</div>
                </i>
                </Link>
              </li>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-emerald-300 hover:bg-black">
                      More Options
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="space-y-3 py-3 text-center">
                      <MenuItem className='block'>
                        <span><Link className='text-black text-center' to="change-password">Change Password</Link></span>
                      </MenuItem>
                      <MenuItem className='block'>
                        <span><Link className=' text-black ' to={`/orders/${cartID}`}>My Orders</Link></span>
                      </MenuItem>
                      <MenuItem className='block'>
                        <span><Link className='text-black' onClick={signOut}>Signout</Link></span>

                      </MenuItem>

                    </div>
                  </MenuItems>
                </Menu>
              </>
              : <><li>
                <Link to="login">Login</Link>
              </li>
                <li><Link to="register">Register</Link></li></>}
            </ul>
        </div>
      </div>
    </nav> */}

  </>

}
