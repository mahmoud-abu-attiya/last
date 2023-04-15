import styles from './index.module.css'
import BtnArrow from '../BtnArrow'
import Image from 'next/image'
import ScrollDown from '../scrollDown'
import { memo } from 'react'
import { useState, useEffect } from 'react'

const FullPageSlider = ({ title, btnText, btnUrl, data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const next = () => {
    if (activeIndex !== data.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 3000)
    return () => clearInterval(interval)
  }, [activeIndex])
  return (
    <div className={styles.slider}>
      {data.map((item, i) => {
        return (
          <div className={`transition duration-500 ${i === activeIndex ? "opacity-100" : "opacity-0"}`} key={i}>
            <Image src={item.image} alt="hero" fill className={`object-cover`} />
            <div className={styles.slider__content}>
                <div className={styles.slider__container}>
                  <h1 className={styles.slider__title}>
                    {item.title || title}
                  </h1>
                  <BtnArrow
                    title={item.button_text || btnText}
                    href={btnUrl}
                  />
                </div>
              </div>
          </div>
        )
      })
      }
      <ScrollDown />
    </div>
  )
}

export default memo(FullPageSlider)
