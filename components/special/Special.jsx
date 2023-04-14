import styles from './index.module.css'
// import { Swiper, SwiperSlide } from 'swiper/react'
import SpecialCard from './specialCard'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const Special = ({ data }) => {  const slides = data.concat(data.slice(0, 4))
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
    <div className="lg:container py-20 relative mb-20">
    {/* <div className={styles.news__container}> */}
      <h3
        className={`mb-10 ${styles.news__title}`}
      >
        العروض المميزة
      </h3>
      <div className='w-full overflow-hidden'>
        <div className='swiper-wrapper'>
          <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
            {slides.map((slide, index) => {
              return (
                <div key={index}>
                  <SpecialCard
                    item={slide}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Link href='/special-offers' className={styles.view__all}>
        عرض الكل
      </Link>
      <div className='flex gap-20 text-center items-center justify-center mt-20'>
        <button className="btn p-4 group" onClick={prev}>
          <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={80} height={80} />
        </button>
        <button className="btn p-4 group" onClick={next}>
          <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={80} height={80} />
        </button>
      </div>
    </div>
  )
}

export default Special
