import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import BtnArrow from '../BtnArrow'
import ScrollDown from '../scrollDown'

export default function Hero({ slides }) {
   const [activeIndex, setActiveIndex] = useState(0)
   const next = () => {
      if (activeIndex !== slides.length - 1) {
         setActiveIndex(activeIndex + 1)
      } else {
         setActiveIndex(0)
      }
   }

   const prev = () => {
      if (activeIndex !== 0) {
         setActiveIndex(activeIndex - 1)
      } else {
         setActiveIndex(slides.length - 1)
      }
   }

   useEffect(() => {
      const interval = setInterval(() => {
         next()
      }, 3000)
      return () => clearInterval(interval)
   }, [activeIndex])
   return (
      <div className='h-screen w-full'>
         {slides.map((slide, index) => {
            return (
               <div className={`transition duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0"}`} key={index}>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"><span className='sr-only'>overlay</span></div>
                  <Image src={slide.image} alt="hero" fill className={`object-cover`} />
                  <div className={styles.hero__content}>
                     <div
                        className={styles.hero__container}
                     >
                        <h1 className={styles.hero__title}>{slide.title}</h1>
                        <BtnArrow
                           title={slide.button_text}
                           href={slide.link || '/'}
                        />
                     </div>
                  </div>
               </div>
            )
         })}
         <div className="btns absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 lg:gap-16 z-10">
            <button className="btn p-4 group" onClick={prev}>
               <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={80} height={80} />
            </button>
            <div className=" whitespace-nowrap text-white">{activeIndex + 1} / {slides.length}</div>
            <button className="btn p-4 group" onClick={next}>
               <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={80} height={80} />
            </button>
         </div>
         <ScrollDown />
      </div>
   )
}
