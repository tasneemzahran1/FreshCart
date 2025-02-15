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
      <h1 className='text-emerald-400 text-2xl font-bold mt-10 xsm:mt-20'>Brands</h1>
      <div className="row">
        {allBrands?.map((brand) => <div className='w-1/4 p-3'>
          <div className="inner">
            <img src={brand.image} alt="brand logo" className='w-full' />
          </div>
        </div>)}
      </div>
    </>}

  </>

}
