import styles from './index.module.css'
// import SpecialCard from './specialCard'
import Link from 'next/link'
// import { useState } from 'react'
import Image from 'next/image'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';

const SpecialCard = ({ item, en }) => {
  return (
    <div className="bg-gray-200 mx-4 dark:bg-gray-800 rounded-lg overflow-hidden" dir={en ? "ltr" : 'rtl'}>
      <div className="relative h-[14rem]">
        <Image src={item.image} alt={item.title} fill className='object-cover' />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg mb-1">عرض الصيف المميز</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">العرض صالح للتطبيق حتي : <span className='text-primary'>ديسمبر ٣١ , ٢۰٢٣ </span></p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-800 dark:text-gray-100 font-bold text-sm">3500 ريال</span>
          <Link href={`/special-offers/${item.id}`} className="text-[#ff234f] text-sm hover:underline">
            {en ? "View details" : "عرض التفاصيل"}
          </Link>
        </div>
      </div>
    </div>
  )
}

const Special = ({ data, en }) => {

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="absolute top-[67%] left-[calc(50% + 100px)] btn group pt-4 -translate-x-1/2 duration-500" style={{ left: 'calc(50% + 100px)' }} onClick={onClick}>
          <Image src="/icons/prev-arrow.svg" alt="arrow-left" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">prev</span>
        </button>
    )
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className=" absolute top-[67%] left-[calc(50% - 100px)] btn group pt-4 -translate-x-1/2 duration-500" style={{ left: 'calc(50% - 100px)' }} onClick={onClick}>
          <Image src="/icons/next-arrow.svg" alt="arrow-right" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">next</span>
        </button>
    )
  }
  useEffect(() => {
    console.log(data);
 }, []);
  

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
  return (
    <div className="lg:container py-20 relative mb-20 md:mb-0">
      <h3
        className={`mb-10 text-gray-600 dark:text-gray-100 ${styles.news__title}`}
      >
        {en ? "Special Offers" : "العروض المميزة"}
      </h3>
      {/* <div className='w-full md:container special overflow-hidden' onTouchStart={handleStart} onTouchMove={handleMove} onMouseMove={handleMove} onMouseDown={handleStart}>
        <div className='swiper-wrapper'>
          <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
            {slides.map((slide, index) => {
              return (
                <SpecialCard
                  key={index} item={slide}
                />
              )
            })}
          </div>
        </div>
      </div> */}
      <div className="container">
        <Slider {...settings} className='pb-40'>
          {data.map((slide, index) => {
            return (
              <SpecialCard
                key={index} item={slide} en={en}
              />
            )
          })}
        </Slider>
      </div>
      <Link href='/special-offers' className={`border-b-2 border-secondary dark:border-gray-300 text-secondary dark:text-gray-300 ${styles.view__all}`}>
        {en ? "View All" : "عرض الكل"}
      </Link>
      {/* <div className='flex gap-20 text-center items-center justify-center mt-20'>
        <button className="btn p-4 group hover:translate-x-3 duration-500" onClick={prev}>
          <Image src="/icons/prev-arrow.svg" alt="arrow-left" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">prev</span>
        </button>
        <button className="btn p-4 group hover:-translate-x-3 duration-500" onClick={next}>
          <Image src="/icons/next-arrow.svg" alt="arrow-right" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">next</span>
        </button>
      </div> */}
    </div>
  )

}

export default Special
