import React from 'react'
import style from "./Notfound.module.css"
export default function Notfound() {
  return <>
    <section className='h-screen'>
      <h1 className='text-emerald-400 text-2xl font-bold md:mt-10'>ERROR 404</h1>
      <h2 className=' text-xl font-semibold text-white mt-3'>Sorry This Page is not found</h2>
    </section>
  </>
}
