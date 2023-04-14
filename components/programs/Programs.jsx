import React from 'react'
import FlipCard from '../FlipCard'
import Image from 'next/image'

export default function Programs({ data }) {
  data.push(...data.slice(0, 2))
  return (
    <section className='grid grid-cols-12 py-16 pr-16'>
      <div className='col-span-12 md:col-span-3'>
        <h2>أحدث
          خصومات
          البرامج
          السياحية</h2>
        <div className="btns">
          <button className="btn p-4 group">
            <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
          </button>
          <button className="btn p-4 group">
            <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
          </button>
        </div>
      </div>
      <div className='col-span-12 md:col-span-9'>
        <div className='bg-gray-200'>
        <div className='w-full overflow-hidden'>
         <div className="w-fit flex gap-4">
            {data.map((slide, index) => {
               return (
                  <div className="slide" key={index}>
                     <FlipCard 
                        img={slide.image} 
                        title={slide.title} 
                        description={"lorem ipsom"} 
                        btnTitle={"المذيد"} 
                        btnUrl={"/link"} 
                     />
                  </div>
               )
            })}
         </div>
      </div>
        </div>
      </div>
    </section>
  )
}
