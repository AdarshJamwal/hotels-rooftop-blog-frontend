import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Img1 from "../../assets/hero-carousel/BImg1.jpg"
import Img2 from "../../assets/hero-carousel/CImg6.jpg"
import Img3 from "../../assets/hero-carousel/GImg5.jpg"
import Img4 from "../../assets/hero-carousel/PImg4.jpg"
import Img5 from "../../assets/hero-carousel/RImg3.jpg"
import Img6 from "../../assets/hero-carousel/TImg2.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
        <div className='md:w-1/2 w-full text-center'>
            <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Hotels With Rooftop Pools Near Me</h1>
            <p className='py-4'>Discovering hotels with rooftop pools near you! Wheater you are planning a luxurious or a weekend gateway
            , our curated selection of hotels with rooftop pools will help beat the heat and elevate your travel experience
            </p>
        </div>

        <div className='md:w-1/2 w-full mx-auto'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={Img1} alt=""  className='w-full lg:h-[400px] sm:h-96 h-80'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img2} alt=""  className='w-full lg:h-[400px] sm:h-96 h-80'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img3} alt=""  className='w-full lg:h-[400px] sm:h-96 h-80'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img4} alt=""  className='w-full lg:h-[400px] sm:h-96 h-80'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img5} alt=""  className='w-full lg:h-[400px] sm:h-96 h-80'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={Img6} alt=""  className='w-full lg:h-[420px] sm:h-96 h-80'/>
        </SwiperSlide>
        
      </Swiper>
        </div>
    </div>
  )
}

export default Hero