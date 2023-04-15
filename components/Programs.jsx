import React, { useState } from 'react'
import FlipCard from './FlipCard'
import Image from 'next/image'
import Link from 'next/link'

export default function Programs({ data }) {
  const slides = data.concat(data.slice(0, 4))
  slides.unshift(data[data.length - 1])
  const step = 100 / slides.length
  let [translate, setTranslate] = useState(step)
  let [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const [canClick, setCanClick] = useState(true)

  const next = () => {
    if (!canClick) return
    setCanClick(false)
    setIndex(index + 1)
    setTranslate((index + 1) * (step))
    if (index === slides.length - 5) {
      setTimeout(() => {
        setTransition(false)
        setTranslate(step)
        setIndex(1)
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
    if (index === 1) {
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
        }, 500);
      }, 10);
    } else {
      setIndex(index - 1)
      setTranslate(translate - 100 / slides.length)
      setTimeout(() => {
        setCanClick(true)
      }, 500);
    }

  }

  return (
    <section className='grid grid-cols-12 py-16 md:py-20 programs'>
      <div className='col-span-12 xl:col-span-3 pr-16 text-white xl:flex flex-col justify-between gap-4'>
        <h2 className='text-2xl lg:text-5xl xl:w-min text-center xl:text-start'>أحدث
          خصومات
          البرامج
          السياحية</h2>
        <div className='hidden xl:block'>
          <button className="btn p-4 group" onClick={prev}>
            <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
          </button>
          <button className="btn p-4 group" onClick={next}>
            <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
          </button>
        </div>
        <Link href="/" className='border-b pb-2 w-fit text-xs hidden xl:block'>
          عرض كل البرامج
          </Link>
      </div>
      <div className='col-span-12 xl:col-span-9'>
        <div className='w-full overflow-hidden'>
          <div className='swiper-wrapper'>
            <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
              {slides.map((slide, index) => {
                return (
                  <div className={index % 2 === 0 ? "translate-y-4" : "-translate-y-4"} key={index}>
                    <FlipCard
                      country={slide}
                      btnTitle={"تفاصيل البرنامج"}
                      btnUrl={"/link"}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden col-span-12 text-center">
      <Link href="/" className='border-b pb-2 w-fit text-xs text-white'>
          عرض كل البرامج
          </Link>
          <div>
          <button className="btn p-4 group" onClick={prev}>
            <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
          </button>
          <button className="btn p-4 group" onClick={next}>
            <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
          </button>
        </div>
      </div>
    </section>
  )
}
