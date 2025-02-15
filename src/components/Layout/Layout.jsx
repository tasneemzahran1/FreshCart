import React from 'react'
import style from "./Layout.module.css"
import Navbar from "./../Navbar/Navbar"
import Footer from "./../Footer/Footer"
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar></Navbar>
    <div className='container mt-6 pt-6 m-auto'>
      <Outlet >
      </Outlet>
    </div>
    <Footer></Footer>
  </>

}
