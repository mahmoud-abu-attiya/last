import styles from './index.module.css'
import SpecialCard from './specialCard'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const Special = ({ data }) => {
  const slides = data.concat(data.slice(0, 4))
  slides.unshift(data[data.length - 1])
  const step = 100 / slides.length
  let [translate, setTranslate] = useState(step)
  let [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const [canClick, setCanClick] = useState(true)
  const [position, setPosition] = useState(null)


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

  const handleStart = (e) => {
    let down;
    if (e.touches) {
      down = e.touches[0].clientX
    } else {
      down = e.clientX
    }
    setPosition(down)
  }

  const handleMove = (e) => {
    const down = position

    if (down === null) {
      return
    }

    let current;
    if (e.touches) {
      current = e.touches[0].clientX
    } else {
      current = e.clientX
    }
    const diff = down - current

    if (diff > 5) {
      prev()
    }

    if (diff < -5) {
      next()
    }

    setPosition(null)
  }
  
  return (
    <div className="lg:container py-20 relative mb-20 md:mb-0">
      <h3
        className={`mb-10 ${styles.news__title}`}
      >
        العروض المميزة
      </h3>
      <div className='w-full md:container special overflow-hidden' onTouchStart={handleStart} onTouchMove={handleMove} onMouseMove={handleMove} onMouseDown={handleStart}>
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
      </div>
      <Link href='/special-offers' className={styles.view__all}>
        عرض الكل
      </Link>
      <div className='flex gap-20 text-center items-center justify-center mt-20'>
        <button className="btn p-4 group hover:translate-x-3 duration-500" onClick={prev}>
          <Image src="/icons/prev-arrow.svg" alt="arrow-left" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">prev</span>
        </button>
        <button className="btn p-4 group hover:-translate-x-3 duration-500" onClick={next}>
          <Image src="/icons/next-arrow.svg" alt="arrow-right" width={60} height={60} priority={true} />
          <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">next</span>
        </button>
      </div>
    </div>
  )

}

export default Special
