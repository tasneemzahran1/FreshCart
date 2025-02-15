import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios, { all } from 'axios'
export default function Brands() {
  const [allBrands, setAllBrands] = useState(null)
  const [isLoading, setisLoading] = useState(true)
  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setisLoading(false)
        setAllBrands(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => { getAllBrands() })
  return <>
    {isLoading ? <div className="loader"></div> : <>
      <h1 className='text-emerald-400 text-2xl font-bold md:mt-10'>Brands</h1>
      <div className="row">
        {allBrands?.map((brand) => <div className='p-3 xsm:w-full md:w-1/2 lg:w-1/4'>
          <div className="inner">
            <img src={brand.image} alt="brand logo" className='w-full' />
          </div>
        </div>)}
      </div>
    </>}

  </>

}
