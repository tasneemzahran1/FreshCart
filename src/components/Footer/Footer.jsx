import React from 'react'
import style from "./Footer.module.css"
import logo from "./../../assets/freshcart-logo.svg"
export default function Footer() {
  return <>
    <footer className="bg-emerald-800 w-full text-white py-1">
      <div className="row">
        <div className="w-1/3 ps-5">
          <img src={logo} alt="freshCartLogo" className='w-[150px]' />
          <p className='mt-3 text-start'>Thank you for visiting FreshCart!</p>
        </div>
        <div className="w-1/3 ps-5">
          <p className='text-start font-semibold'>Subscribe Now!</p>
          <input type="email" id="default-search" className="block w-full p-3 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="xyz@freshcart.com" />
        </div>
        <div className="w-1/3 ps-5">
          <p className='font-semibold'>Follow us!</p>
          <ul className='list-none space-x-3 mt-3'>
            <li className='hover:bg-black cursor-pointer border rounded-full px-2 py-1 inline-block	me-0'><i className="fa-brands fa-facebook-f"></i></li>
            <li className='hover:bg-black cursor-pointer border rounded-full px-2 py-1 inline-block	'><i className="fa-brands fa-instagram"></i></li>
            <li className='hover:bg-black cursor-pointer border rounded-full px-2 py-1 inline-block	'><i className="fa-brands fa-x-twitter"></i></li>
            <li className='hover:bg-black cursor-pointer border rounded-full px-2 py-1 inline-block	'><i className="fa-brands fa-tiktok"></i></li>
          </ul>
        </div>
      </div>
    </footer >
  </>

}
