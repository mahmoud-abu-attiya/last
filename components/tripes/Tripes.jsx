import styles from './index.module.css'
import { useState, useMemo, useEffect } from 'react'
import TripesCard from './tripesCard'
import Link from 'next/link'
import Image from 'next/image'

const Tripes = ({ data: countries }) => {
  const [value, setValue] = useState(0)
  const filteredCountries = useMemo(() => {
    if (value === 0) {
      return countries;
    } else if (value === 1) {
      return countries.filter((country) => country.type === 'out');
    } else {
      return countries.filter((country) => country.type === 'in');
    }
  }, [value, countries]);

  const slides = filteredCountries.concat(filteredCountries.slice(0, 4))
  slides.unshift(filteredCountries[filteredCountries.length - 1])
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

  const tripesTabs = ['جميع الوجهات', 'الوجهات الخارجية', 'الوجهات الداخلية']
  return (
    <div className={`grid grid-cols-12 ${styles.tripes}`}>
      <div className="col-span-12 xl:col-span-3 pt-16 xl:py-20 xl:border-l flex flex-col justify-between items-center">
        <Link href='/our-programs' className={"border-b pb-2 w-fit hidden xl:block"}>
          عرض الكل
        </Link>
        <h2
          className={`xl:hidden ${styles.tripes__title}`}
        >
          اختر وجهتك الان
        </h2>
        <div
          className={`flex-row xl:flex-col gap-8 justify-center ${styles.tripes__tabs}`}
        >
          {tripesTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => {setValue(i); setTranslate(0); setIndex(2)}}
              className={`${styles.tripes__tab} text-xl xl:text-2xl border-secondary mx-2 lg:mx-4 ${value == i ? "border-b-2 text-secondary xl:border-none" : "text-gray-600 border-none"}`}
            >
              {tab}
            </button>
          ))}
          <span className={`absolute transition-all hidden xl:flex left-0 -translate-x-1/2 justify-center items-center -translate-y-1/2 w-14 xl:w-16 h-8 bg-white ${value == 0 ? "top-[5%]" : value == 1 ? "top-1/2" : "top-[95%]"}`}>
            <span className="bg-secondary h-1 w-full block"></span>
          </span>
        </div>
        <div className='hidden xl:block'>
          <button className="btn p-4 group hover:translate-x-3 duration-500" onClick={prev}>
            <Image src="/icons/prev-arrow.svg" alt="arrow-left" width={60} height={60} />
            <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">prev</span>
          </button>
          <button className="btn p-4 group hover:-translate-x-3 duration-500" onClick={next}>
            <Image src="/icons/next-arrow.svg" alt="arrow-right" width={60} height={60} />
            <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">next</span>
          </button>
        </div>
      </div>
      <div className={` col-span-12 xl:col-span-9 xl:pr-10 xl:py-20`}>
        <h2
          className={`hidden xl:block ${styles.tripes__title}`}
        >
          اختر وجهتك الان
        </h2>
        <div className='w-full overflow-hidden' onTouchStart={handleStart} onTouchMove={handleMove} onMouseMove={handleMove} onMouseDown={handleStart}>
          <div className='swiper-wrapper'>
            <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
              {slides.map((slide, index) => {
                return (
                  <TripesCard
                    item={slide} key={index}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-8 xl:hidden justify-center mb-16'>
          <button className="btn p-4 group hover:translate-x-3 duration-500" onClick={prev}>
            <Image src="/icons/prev-arrow.svg" alt="arrow-left" width={60} height={60} />
            <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">prev</span>
          </button>
          <button className="btn p-4 group hover:-translate-x-3 duration-500" onClick={next}>
            <Image src="/icons/next-arrow.svg" alt="arrow-right" width={60} height={60} />
            <span className="opacity-0 group-hover:opacity-100 transition text-gray-400 uppercase text-xs duration-500">next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tripes
