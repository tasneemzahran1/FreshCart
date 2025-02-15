import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishlistContext';
export default function ProductDetails() {
  const [Loader, setLoader] = useState(false)
  const [loading, setloading] = useState(false)
  const [isclicked, setisclicked] = useState(false)

  let { addToList } = useContext(wishlistContext)
  async function addTowishlist(id) {
    setcurrentID(id)
    setLoading(true)
    let { data } = await addToList(id)
    console.log(data);
    if (data.status == "success") {
      setLoading(false)
      setisclicked(true)
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
  }
  let { addProductTocart } = useContext(cartContext)
  async function addToCart(id) {
    setcurrentID(id)
    setLoader(true)
    let { data } = await addProductTocart(id)
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message)
      setLoader(false)

    } else {
      toast.error(data.message)
      setLoader(false)

    }
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])
  const [relatedProducts, setrelatedProducts] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [currentID, setcurrentID] = useState(0)

  let { id, category } = useParams()
  function getProduct(id) {
    setisLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data.data);
        setisLoading(false)
        setImages(res.data.data.images)
        console.log(res.data.data.images);


      })
  }
  function getRelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((product) => product.category.name == category)
        setrelatedProducts(related)
      })
  }
  useEffect(() => {
    getProduct(id)
    getRelatedProducts()
  }, [])
  return <>
    {isLoading ? <div className="loader"></div> : <>
      <div key={products._id} className="row text-start items-center text-white">
        <div className='w-1/3'>
          <Slider {...settings}>
            {images.map((image) => <>
              <img src={image} alt="productImage" className='w-full h-[350px]' />
            </>
            )}
          </Slider>
        </div>
        <div className="w-2/3 ps-8">
          <h4 className='font-semibold'>{products?.title}</h4>
          <p className='my-3 text-gray-500'>{products?.description}</p>
          <h5 className='my-3'>{products?.category?.name}</h5>
          <div className='flex justify-between my-2'>
            <span>{products?.price} EGP</span>
            <span><i className="fa-solid fa-star text-yellow-400"></i>{products?.ratingsAverage}</span>
          </div>
          <div onClick={(() => { addToCart(products.id) })} className=" cursor-pointer p-1 bg-emerald-600 rounded text-white font-semibold text-center mt-6">{Loader ? <i className="fa-solid fa-spinner animate-spin"></i> : "Add to cart"}</div>
          <div onClick={(() => { addTowishlist(products.id) })} className=" cursor-pointer p-1 bg-emerald-600 rounded text-white font-semibold text-center mt-6">{loading ? <i className="fa-solid fa-spinner animate-spin"></i> : isclicked ? <> <i className="fa-solid fa-heart text-red-600"></i><span> Add to Wishlist</span></> : <> <i className="fa-solid fa-heart text-white"></i><span> Add to Wishlist</span></>}</div>
        </div>
      </div>
      <h3 className='font-bold text-center text-emerald-400 text-2xl mb-6'>Related Products</h3>
      <div className="row">
        {relatedProducts.map((relatedproduct) => <>
          <div key={relatedproduct.id} className="w-1/4">
            <div className="inner mx-3 my-3">
              <div className=" bg-white border border-gray-200 rounded-lg shadow-sm">
                <img className="p-8 rounded-t-lg w-full" src={relatedproduct.imageCover} alt="product image" />
                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-emerald-600 line-clamp-1">{relatedproduct.title}</h5>
                  <h6 className="text-sm tracking-tight text-gray-400 text-start my-1 line-clamp-2">{relatedproduct.description}</h6>
                  <div className="flex items-center mt-2.5 mb-5 justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">{relatedproduct.price} EGP</span>
                    <span className="font-semibold text-gray-900 dark:text-white"><i className="fa-solid fa-star text-yellow-400"></i>{relatedproduct.ratingsAverage} </span>
                  </div>
                  <div onClick={(() => { addToCart(relatedproduct.id) })} className="text-white cursor-pointer bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart
                  </div>
                  <div onClick={(() => { addTowishlist(relatedproduct.id) })} className="mt-2 text-white cursor-pointer bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><> <i className="fa-solid fa-heart text-white"></i><span> Add to Wishlist</span></>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>)}
      </div>
    </>}

  </>

}
