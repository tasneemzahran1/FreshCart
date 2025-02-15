import React, { useContext, useState } from 'react'
import style from "./Products.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Product from '../Product/Product'
export default function Products() {
  
  let { data, isLoading } = useProducts()
  if (isLoading == true) {
    return <div className="loader"></div>
  }
 

  return <>
    <h1 className='text-emerald-400 text-2xl font-bold mt-10 xsm:mt-20'>Products</h1>
    <div className="row">
      {data?.data?.data.map((product) => <Product key={product._id} product={product}></Product>
      )}
    </div>

  </>

}
