import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Orders() {
    const [isLoading, setisLoading] = useState(false)
    const [orders, setOrders] = useState(null)
    let { userLogin, setuserLogin } = useContext(UserContext)
    let { cartID } = useParams()

    function getAllOrders() {
        setisLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartID}`)
            .then((res) => {
                setisLoading(false)
                setOrders(res.data)
            })
    }
    useEffect(() => {
        if (userLogin) {
            getAllOrders()
        }
    }, [userLogin])
    return <>
        {isLoading ? <div className="loader"></div> : orders?.length > 0 ? <>
            <h1 className='text-emerald-600 text-2xl font-bold mt-10 md:mt-10'>Orders
            </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-white text-lg text-center uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) =>
                            <tr key={order.id} className="border-b text-center dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600">
                                <td className="p-4 text-xl">
                                    <i class="fa-solid fa-truck-fast text-white"></i>
                                </td>
                                <td className="px-6 py-4 font-semibold text-lg text-white">
                                    {order?.id}
                                </td>
                                <td className="px-6 py-4">
                                    {order?.createdAt}
                                </td>
                                <td className="px-6 py-4 font-semibold text-white text-lg">
                                    {order?.totalOrderPrice} EGP
                                </td>
                                <td className="px-6 py-4 font-semibold text-white text-lg">
                                    {order?.paymentMethodType}
                                </td>
                                <td className="px-6 py-4 font-semibold text-white text-lg">
                                    {order?.isDelivered == false ? <p>Not Delivered</p> : <p>Delivered</p>}
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div >
        </> :<><section className="h-screen"><h1 className='text-2xl text-white text-center capitalize font-bold md:mt-10'>No orders</h1></section></> }
    </>
}
