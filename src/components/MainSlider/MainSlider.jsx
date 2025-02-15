import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";
import slide1 from '../../images/slider-image-1.jpeg'
import slide2 from '../../images/slider-image-2.jpeg'
import slide3 from '../../images/slider-image-3.jpeg'
import slide4 from '../../images/grocery-banner.png'
import slide5 from '../../images/grocery-banner-2.jpeg'
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return <>
    <div className="row mt-7 xsm:mt-15">
      <div className="w-3/4">
        <Slider {...settings}>
          <img src={slide1} alt="slide1" className='w-full h-[400px]' />
          <img src={slide5} alt="slide5" className='w-full h-[400px]' />
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slide2} alt="slide2" className='w-full h-[200px]' />
        <img src={slide3} alt="slide3" className='w-full h-[200px]' />
      </div>
    </div>
  </>

}
