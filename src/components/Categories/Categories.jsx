import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios, { all } from 'axios'
export default function Categories() {
  const [allCategories, setAllCategories] = useState(null)
  const [isLoading, setisLoading] = useState(true)

  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setAllCategories(res.data.data)
        setisLoading(false)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => { getAllCategories() })
  return <>{isLoading ? <div className="loader"></div> : <section>
    <h1 className='text-emerald-400 text-2xl font-bold md:mt-10'>Categories</h1>
    <div className="row">
      {allCategories?.map((category) => <div className='md:w-1/2 lg:w-1/5 pb-3 xsm:w-full'>
        <div className="inner">
          <img src={category.image} alt="category logo" className='w-full object-contain h-[200px]' />
          <h2 className='text-center font-semibold text-white mt-2'>{category.name}</h2>
        </div>
      </div>)}
    </div>
  </section>}
  </>
}
