import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { wishlistContext } from '../../Context/WishlistContext'

export default function Product({ product}) {
    let { addToList } = useContext(wishlistContext)
    let { addProductTocart } = useContext(cartContext)
    const [loading, setloading] = useState(false)
    const [currentID, setcurrentID] = useState(0)
    const [loader, setloader] = useState(false)
    const [isclicked, setisclicked] = useState(false)
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
    return <>
        <div key={product.id} className="xsm:w-full md:w-1/2 lg:w-1/4">
            <div className="product mx-3 text-white">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                    <img src={product.imageCover} alt="productimg" className='w-full' />
                    <h3 className='font-bold my-2 text-emerald-400'>{product.category.name}</h3>
                    <h4 className='mb-3 line-clamp-1 text-white'>{product.title}</h4>
                    <div className='flex justify-between mb-3'>
                        <span>{product.price} EGP</span>
                        <span><i className="fa-solid fa-star text-yellow-400"></i> {product.ratingsAverage}</span>
                    </div>
                </Link>
                <div onClick={(() => { addToCart(product.id) })} className="btn cursor-pointer bg-emerald-600 text-white my-3 p-1 rounded border-solid">{(loading && currentID == product.id) ? <i className="fa-solid fa-spinner animate-spin"></i> : "Add to cart"}</div>
                <div onClick={(() => { addTowishlist(product.id) })} className="btn cursor-pointer bg-emerald-600 text-white my-3 p-1 rounded border-solid">{(loader && currentID == product.id) ? <i className="fa-solid fa-spinner animate-spin"></i> : (isclicked && currentID == product.id) ? <> <i className="fa-solid fa-heart text-red-600"></i><span> Add to Wishlist</span></> : <> <i className="fa-solid fa-heart text-white"></i><span> Add to Wishlist</span></>}</div>
            </div>
        </div>
    </>
}
