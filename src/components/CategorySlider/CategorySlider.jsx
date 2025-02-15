import React, { useState } from 'react'
import style from "./CategorySlider.module.css"
import Slider from "react-slick";
import axios from 'axios'
import { useEffect } from 'react';
export default function CategorySlider() {
  const [category, setCategory] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay:true,
    autoplaySpeed:1000,
  };
  function getCategory() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.data)
      })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return <>
  <h3 className='font-semibold text-xl text-start text-white'>Shop Popular Categories</h3>
    <Slider {...settings}>
        {category.map((cate) => <div className='my-5 text-white'>
              <img src={cate.image} alt="categoryImage" className='w-full object-contain h-[100px]' />
              <h4>{cate.name}</h4>
        </div>)}

    </Slider>
  </>
}