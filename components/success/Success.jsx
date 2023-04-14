import styles from './index.module.css'
import { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BtnArrow from '../BtnArrow'

const Success = ({ data, features_slides }) => {
  const [value, setValue] = useState(0)
  return (
    <div className={styles.success__container} id='success'>
      <div className={styles.success__top}>
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
        <Link href='/about-us' className={styles.view__all}>
          عرض مميزات وسام النجاح
        </Link>
      </div>
      <div className={styles.success__content}>
        {features_slides.map((slide, i) => {
          return (
            <div className={`transition duration-500 ${i === value ? "opacity-100" : "opacity-0"}`} key={i}>
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"><span className='sr-only'>overlay</span></div>
              <Image src={slide.image} alt={`background image : ${i}`} fill className={`object-cover`} />
            </div>
          )
        })}
        <div className={styles.success__item}>
          <div
            className={styles.success__item__container}
          >
            <h3 className={styles.success__item__title}>{data[value]?.name}</h3>
            <p className={styles.success__item__text}>{data[value]?.content}</p>
            <BtnArrow title={data[value]?.name} href={'/about-us'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Success)
