import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContext'
export default function Wishlist() {
    let { addProductTocart } = useContext(cartContext)
    async function addToCart(id) {
        let { data } = await addProductTocart(id)
        if (data.status == "success") {
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    }
    let { getLoggedUserWishlist, deleteFromList } = useContext(wishlistContext)
    const [isLoading, setisLoading] = useState(false)
    const [wishes, setwishes] = useState(null)
    async function getItemsTolist() {
        setisLoading(true)
        let { data } = await getLoggedUserWishlist()
        setwishes(data?.data)
        setisLoading(false)
    }
    async function deleteItem(id) {
        let response = await deleteFromList(id)
        if (response?.data?.status == "success") {
            setwishes(response?.data?.data)
            toast.success("Product is deleted successfully")
            getItemsTolist()
        }
    }
    useEffect(() => { getItemsTolist() }, [])
    return <>{isLoading ? <div className="loader"></div> : <section className='h-screen'> <h1 className='md:mt-10 text-emerald-400 mt-10 text-2xl font-bold'>Wishlist</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className=" text-white text-lg text-center uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <i className="fa-solid fa-heart text-red-600 text-center"></i>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {wishes?.map((wish) => <>
                        <tr key={wish?.id} className="border-b text-center dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src={wish?.imageCover} className="w-16 md:w-32 max-w-full max-h-full m-auto" alt="productImage" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-white text-lg">
                                {wish?.title}                            </td>

                            <td className="px-6 py-4 font-semibold text-white text-lg">
                                {wish?.price} EGP
                            </td>
                            <td className="px-6 py-4">
                                <span onClick={(() => { addToCart(wish?.id), deleteItem(wish?.id) })} className="font-medium text-lg text-emerald-600 dark:text-red-500 hover:underline cursor-pointer">Add to Cart</span>
                            </td>
                            <td className="px-6 py-4">
                                <span onClick={(() => { deleteItem(wish?.id) })} className="text-lg font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
                            </td>

                        </tr>
                    </>
                    )}
                </tbody>
            </table>
        </div></section>}

    </>
}
