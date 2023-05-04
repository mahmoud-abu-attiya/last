import styles from './index.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BtnArrow from '../BtnArrow'

const Success = ({ data, features_slides }) => {
  const [value, setValue] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const changebg = () => {
    if (activeIndex !== features_slides.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }
  useEffect(() => {
      const interval = setInterval(() => {
        changebg()
      }, 3000)
      return () => clearInterval(interval)
  }, [activeIndex])
  useEffect(() => {
    changebg()
  }, [value])
  return (
    <div className={`grid grid-cols-12 ${styles.success__container}`} id='success'>
      <div className={`col-span-12 xl:col-span-5 gap-4 xl:gap-20 ${styles.success__top}`}>
        <h2
          className={styles.success__title}
        >
          مميزات وسام النجاح
        </h2>
        <div
          className={styles.success__tabs}
        >
          {data.map((tab, i) => (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`${styles.success__tab} ${
                value === i ? styles.success__tab__active : ''
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <Link href='/about-us' className={"border-b pb-2 hidden xl:block text-xs whitespace-nowrap"}>
          عرض مميزات وسام النجاح
        </Link>
      </div>
      <div className={`col-span-12 xl:col-span-7 ${styles.success__content}`}>
        {features_slides.map((slide, i) => {
          return (
            <div className={`transition absolute w-full h-full top-0 left-0 duration-[2s] ${i === activeIndex ? "opacity-100" : "opacity-0"}`} key={i}>
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"><span className='sr-only'>overlay</span></div>
              <Image src={slide.image} alt={`background image : ${i}`} fill className={`object-cover`} />
              <div className={styles.success__item}>
                <div
                  className={styles.success__item__container}
                >
                  <h3 className={styles.success__item__title}>{data[i].name}</h3>
                  <p className={styles.success__item__text}>{data[i].content}</p>
                  <BtnArrow title={data[i].name} href={'/about-us'} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="col-span-12 block xl:hidden w-full bg-secondary py-4 text-xs text-center">
        <Link href='/about-us' className={"border-b pb-2 text-xs whitespace-nowrap"}>
          عرض مميزات وسام النجاح
        </Link>
      </div>
    </div>
  )
}

export default Success
