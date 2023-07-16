import styles from './index.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BtnArrow from '../BtnArrow'
import { useSelector } from 'react-redux'

const Success = ({ data, features_slides }) => {
  const en = useSelector((state) => state.langs.value);
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
  return (
    <div className={`grid grid-cols-12 ${styles.success__container}`} id='success'>
      <div className={`col-span-12 xl:col-span-5 gap-4 xl:gap-20 ${styles.success__top}`}>
        <h2
          className={en ? styles.success__title + ' w-[250px]' : styles.success__title + ' w-1/2'}
        >
          {en ? "Advantages of Wesam El-Nagah" : "مميزات وسام النجاح"}
        </h2>
        <div
          className={styles.success__tabs}
        >
          {data.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`${styles.success__tab} ${
                activeIndex === i ? styles.success__tab__active : ''
              }`}
            >
              {/* {en ? tab.name.en : tab.name.ar} */}
              {tab.name}
              {activeIndex == i && <div className={`line absolute top-1/2 w-[70px] h-[4px] bg-white ${en ? "right-[-140px]" : "left-[-140px]"}`}></div>}
            </button>
          ))}
        </div>
        <Link href='/about' className={"border-b pb-2 hidden xl:block text-xs whitespace-nowrap"}>
        {en ? "Advantages of Wesam El-Nagah" : "مميزات وسام النجاح"}
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
                  <BtnArrow title={data[i].name} href={'/about'} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="col-span-12 block xl:hidden w-full bg-secondary py-4 text-xs text-center">
        <Link href='/about' className={"border-b pb-2 text-xs whitespace-nowrap"}>
          عرض مميزات وسام النجاح
        </Link>
      </div>
    </div>
  )
}

export default Success
