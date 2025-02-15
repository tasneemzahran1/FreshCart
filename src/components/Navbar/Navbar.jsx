import React, { useContext, useEffect, useState } from 'react'
import style from "./Navbar.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import logo from './../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'
import { Menu, MenuButton, MenuItem, MenuItems } from './../../../node_modules/@headlessui/react'
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



  useEffect(() => {
    if (userLogin) {
      getProductsCount()
    }
  }, [userLogin])

  return <>
    <nav className="bg-emerald-800 fixed top-0 left-0 right-0 border-gray-200 z-50 ">
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
    </nav>

  </>

}
