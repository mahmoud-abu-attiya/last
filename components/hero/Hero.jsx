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
      }, 4000)
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
         <div className="btns absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 xl:gap-24 z-10">
            <button className="btn p-4 group opacity-50 hover:opacity-100" onClick={prev}>
               <svg xmlns="http://www.w3.org/2000/svg" width="84" height="83" viewBox="0 0 84 83" className='rotate-180 max-w-[15vw]'>
               <g id="Previous" transform="translate(-1197.879 -864.108)">
                  <g id="Group_51" data-name="Group 51" transform="translate(1289.118 952.395) rotate(180)">
                     <g id="Group_14" data-name="Group 14" transform="translate(49.439 5.433) rotate(45)" opacity="0.9">
                     <path id="Path_28" data-name="Path 28" d="M0,54.614,55.006,0" transform="translate(1.214 2.096)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3"/>
                     <path id="Path_29" data-name="Path 29" d="M0,0H45.219V42.667" transform="translate(12.109 1.214)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                     </g>
                  </g>
               </g>
            </svg>
            </button>
            <div className=" whitespace-nowrap text-white text-xl">{activeIndex + 1} / {slides.length}</div>
            <button className="btn p-4 group opacity-50 hover:opacity-100" onClick={next}>
               <svg xmlns="http://www.w3.org/2000/svg" width="84" height="83" viewBox="0 0 84 83" className='max-w-[15vw]'>
                  <g id="Previous" transform="translate(-1197.879 -864.108)">
                     <g id="Group_51" data-name="Group 51" transform="translate(1289.118 952.395) rotate(180)">
                        <g id="Group_14" data-name="Group 14" transform="translate(49.439 5.433) rotate(45)" opacity="0.9">
                           <path id="Path_28" data-name="Path 28" d="M0,54.614,55.006,0" transform="translate(1.214 2.096)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3" />
                           <path id="Path_29" data-name="Path 29" d="M0,0H45.219V42.667" transform="translate(12.109 1.214)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                        </g>
                     </g>
                  </g>
               </svg>
            </button>
         </div>
         <ScrollDown />
      </div>
   )
}
