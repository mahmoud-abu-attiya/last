import React, { useState } from 'react'
import FlipCard from '../FlipCard'
import Image from 'next/image'

export default function Programs({ data }) {
  const slides = data.concat(data)
  let [translate, setTranslate] = useState(0)
  let [index, setIndex] = useState(0)
  const [transition, setTransition] = useState(true)
  const [canClick, setCanClick] = useState(true)

  const next = () => {
    if (!canClick) return
    setCanClick(false) 
    setIndex(index + 1)
    setTranslate((index+1) * (100 / slides.length))
    if (index === slides.length - 5) {
      setTimeout(() => {
        setTransition(false)
        setTranslate(0)
        setIndex(0)
        setTimeout(() => {
          setTransition(true)
          setCanClick(true)
        }, 10)
      }, 500);
    } else {
      setTimeout(() => {
        setCanClick(true)
      }, 500);
    }
  }

  const prev = () => {
    if (!canClick) return
    setCanClick(false)
    if (index === 0) {
      setTransition(false)
      setTranslate((100 / slides.length) * (slides.length - 4))
      setIndex(slides.length - 4)
      translate = (100 / slides.length) * (slides.length - 4)
      index = slides.length - 4
      setTimeout(() => {
        setTransition(true)
        setIndex(index - 1)
        setTranslate(translate - 100 / slides.length)
        setTimeout(() => {
          setCanClick(true)
        } , 500);
      }, 10);
    }else{
      setIndex(index - 1)
      setTranslate(translate - 100 / slides.length)
      setTimeout(() => {
        setCanClick(true)
      } , 500);
    }
    
  }

  return (
    <section className='grid grid-cols-12 py-16 pr-16'>
      <div className='col-span-12 md:col-span-3'>
        <h2>أحدث
          خصومات
          البرامج
          السياحية</h2>
        <div className="btns">
          <button className="btn p-4 group" onClick={prev}>
            <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
          </button>
          <button className="btn p-4 group" onClick={next}>
            <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
          </button>
        </div>
      </div>
      <div className='col-span-12 md:col-span-9'>
        <div className='bg-gray-200'>
          <div className='w-full overflow-hidden'>
            <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
              {slides.map((slide, index) => {
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
