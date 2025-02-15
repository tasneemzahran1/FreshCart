import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
export default function Cart() {
  const [cartItem, setCartItem] = useState(null)
  const [cartID, setCartID] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let { getLoggedUserCart, updateCart, deleteItem, clearCart } = useContext(cartContext)
  async function getItemsToCart() {
    setisLoading(true)
    let x = await getLoggedUserCart()
    setCartItem(x?.data?.data)
    setCartID(x?.data?.data._id)
    setisLoading(false)
  }
  async function addItemsToCart(id, count) {
    let { data } = await updateCart(id, count)
    setCartItem(data?.data)
    if (data?.status == "success") {
      toast.success("Cart is updated successfully")
    } else {

      toast.error("Cart isn't updated. Try again.")
    }
  }
  async function deleteItemFromCart(id) {
    let response = await deleteItem(id)
    if (response.data.status == "success") {
      setCartItem(response.data.data)
      toast.success("Product is deleted successfully")

    }
  }
  async function deleteCart() {
    let response = await clearCart()
    setCartItem(response.data.data)
  }
  useEffect(() => { getItemsToCart() }, [])
  return <>
    {isLoading ? <div className="loader"></div> : cartItem?.products.length > 0 ? <section className='h-screen'>
      <h1 className='text-emerald-600 text-2xl font-bold md:mt-10'>Cart Items
      </h1>
      <h2 className='text-lg font-semibold my-5 text-white'>Total Price= {cartItem?.totalCartPrice}</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-white text-lg text-center uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItem?.products.length > 0 ? cartItem?.products.map((product) =>
              <tr key={product._id} className="border-b text-center dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product?.product?.imageCover} className="w-full md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-lg text-white">
                  {product?.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => addItemsToCart(product?.product?.id, product?.count - 1)}>
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <input type="text" id="first_product" className="bg-gray-50 w-14 text-center font-semibold  border border-gray-300 text-emerald-400 text-sm rounded-lg " placeholder={product.count} disabled />
                    </div>
                    <button onClick={() => addItemsToCart(product?.product?.id, product?.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-white text-lg">
                  {product?.price * product?.count} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={(() => { deleteItemFromCart(product?.product?.id) })} className="text-lg font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                </td>
              </tr>) : <h1 className='text-emerald-800 text-center capitalize text-2xl'>No products is added</h1>}
          </tbody>
        </table>
        <Link to={`/checkout/${cartID}`} className="text-lg font-medium text-white p-2 border-0 m-3 rounded-md bg-emerald-700 dark:text-red-500 hover:bg-emerald-800">Check out</Link>
        {/* <Link to={`/orders/${cartID}`} className="text-lg font-medium text-white p-2 border-0 m-3 rounded-md bg-emerald-700 dark:text-red-500 hover:bg-emerald-800">Check out</Link> */}
        <button onClick={(() => { deleteCart() })} className="text-lg font-medium text-white p-2 border-0 m-3 rounded-md bg-red-700 dark:text-red-500 hover:bg-red-800">Clear</button>
      </div >
    </section> :<><section className='h-screen'><h1 className='text-2xl mt-10 xsm:mt-20 text-white text-center capitalize font-bold'>No products is added</h1></section> </>}
  </>
}