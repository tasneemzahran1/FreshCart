import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios'
import Categories from './../Categories/Categories';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishlistContext';
import Product from '../Product/Product';
export default function RecentProducts() {
  const [inputValue, setInputValue] = useState('');
  const [searched, setSearched] = useState(null)
  const [productName, setproductName] = useState(null)
  const [loading, setloading] = useState(false)
  const [isclicked, setisclicked] = useState(false)
  const [loader, setloader] = useState(false)
  const [currentID, setcurrentID] = useState(0)
  let { addToList } = useContext(wishlistContext)
  let { addProductTocart } = useContext(cartContext)
  let { data, error, isError, isLoading } = useProducts()
  async function addToCart(id) {
    setcurrentID(id)
    setloading(true)
    let { data } = await addProductTocart(id)
    if (data.status == "success") {
      toast.success(data.message)
      setloading(false)

    } else {
      toast.error(data.message)
      setloading(false)

    }
  }
  async function addTowishlist(id) {
    setcurrentID(id)
    setloader(true)
    let { data } = await addToList(id)
    if (data.status == "success") {
      toast.success(data.message)
      setloader(false)
      setisclicked(true)
    } else {
      toast.error(data.message)
      setloader(false)
    }
  }
  // const [products, setProducts] = useState([])

  // function getProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       setProducts(res.data.data);

  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     })
  // }
  useEffect(() => {
    if (data?.data?.data) {
      setSearched(data?.data?.data)
    }
  }, [data])
  if (isError == true) {
    <h3>{error}</h3>
  }
  if (isLoading == true) {
    return <div className="loader"></div>
  }
  async function searchByName(e) {
    e.preventDefault()
    setSearched(data?.data?.data.filter((product) => product?.title.includes(inputValue)))
  }

  return <>
    <form onSubmit={searchByName} className="max-w-md mx-auto my-6">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input onChange={(e) => setInputValue(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Search Products .." />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Search</button>
      </div>
    </form>

    <div className="row flex">
      {searched?.map((product) => <Product key={product._id} product={product}></Product>)}
    </div>

  </>

}
