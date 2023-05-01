import styles from './index.module.css'
import React, { memo, useState } from 'react'
import Image from 'next/image'
import BtnArrow from '../BtnArrow'

const About = ({ data }) => {
  const [value, setValue] = useState(0)
  const imgs = data.map((img) => img.image)
  return (
    <div className={styles.about} id='about'>
      <div className={styles.about__container}>
        <div className={styles.about__container__top}>
          <h2
            className={styles.about__title}
          >
            عن وسام النجاح
          </h2>
          {/* tabs */}
          <div
            className={styles.about__tabs}
          >
            {data.map((tab, i) => (
              <button
                key={i}
                onClick={() => setValue(i)}
                className={`${styles.about__tab} ${
                  value === i ? styles.about__tab__active : ''
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* Content */}
        {imgs.map((img, i) => (
          <div
            key={i}
            style={{
              zIndex: '-1',
            }}
          >
              <Image
                src={img}
                alt={`background image ${i}`}
                className={`object-cover object-center w-full h-full duration-500 ${value === i ? "opacity-100" : "opacity-0"} transition`}
                fill
              />
          </div>
        ))}
        {/* Filter content based on tabs */}
        <div className={styles.about__item}>
          <div className={styles.about__item__container}>
            <h3
              className={styles.about__item__title}
            >
              {data[value]?.subtitle}
            </h3>
            <div
              className={styles.about__item__content}
            >
              <p className={styles.about__item__text}>{data[value]?.content}</p>
              <BtnArrow title={data[value]?.title} href={'/contact-us'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(About)
