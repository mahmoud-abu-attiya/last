import styles from './index.module.css'
import { useState, useMemo } from 'react'
import TripesCard from './tripesCard'
import Link from 'next/link'
import Image from 'next/image'

const Tripes = ({ data: countries }) => {
  const [value, setValue] = useState(0)
  const filteredCountries = useMemo(() => {
    if (value === 0) {
      return countries;
    } else if (value === 1) {
      return countries.filter((country) => country?.type === 'out');
    } else {
      return countries.filter((country) => country?.type === 'in');
    }
  }, [value, countries]);

  const slides = filteredCountries.concat(filteredCountries.slice(0, 4))
  slides.unshift(filteredCountries[filteredCountries.length - 1])
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

  const tripesTabs = ['جميع الوجهات', 'الوجهات الخارجية', 'الوجهات الداخلية']
  return (
    <div className={`grid grid-cols-6 ${styles.tripes}`}>
      <div className="col-span-6 lg:col-span-1 pt-16 lg:py-20 lg:border-l flex flex-col justify-between items-center">
        <Link href='/our-programs' className={"border-b pb-2 w-fit hidden lg:block"}>
        عرض الكل
      </Link>
      <h2
        className={`lg:hidden ${styles.tripes__title}`}
      >
        اختر وجهتك الان
      </h2>
        <div
          className={` flex-row lg:flex-col justify-center ${styles.tripes__tabs}`}
        >
          {tripesTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`${styles.tripes__tab} border-secondary border-none px-4 ${value == i ? "md:border-b-2 text-secondary" : "text-gray-600"}`}
            >
              {tab}
            </button>
          ))}
          <span className={`absolute transition-all hidden lg:flex left-0 -translate-x-1/2 justify-center items-center -translate-y-1/2 w-16 h-8 bg-white ${value == 0 ? "top-[10%]" : value == 1 ? "top-1/2" : "top-[90%]"}`}>
            <span className="bg-secondary h-1 w-full block"></span>
          </span>
        </div>
      <div className='hidden lg:block'>
        <button className="btn p-4 group" onClick={prev}>
          <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
        </button>
        <button className="btn p-4 group" onClick={next}>
          <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
        </button>
      </div>
      </div>
      <div className={` col-span-6 lg:col-span-5 lg:pr-10 lg:py-20`}>
      <h2
        className={`hidden lg:block ${styles.tripes__title}`}
      >
        اختر وجهتك الان
      </h2>
        <div className='w-full overflow-hidden'>
          <div className='swiper-wrapper'>
            <div className={`w-fit flex gap-4 ${transition && "transition duration-500"}`} style={{ transform: `translate(${translate}%)` }}>
              {slides.map((slide, index) => {
                return (
                  <div key={index}>
                    <TripesCard
                      item={slide}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='block lg:hidden text-center'>
        <button className="btn p-4 group" onClick={prev}>
          <Image src="/icons/prev-arrow.svg" className='group-hover:translate-x-4 transition' alt="arrow-left" width={60} height={60} />
        </button>
        <button className="btn p-4 group" onClick={next}>
          <Image src="/icons/next-arrow.svg" className='group-hover:-translate-x-4 transition duration-300' alt="arrow-right" width={60} height={60} />
        </button>
      </div>
      <Link href='/our-programs' className="border-b-2 text-secondary text-xs w-fit mx-auto block pb-1 lg:hidden">
        عرض الكل
      </Link>
      </div>
    </div>
  )
}

export default Tripes
