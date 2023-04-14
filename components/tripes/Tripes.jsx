import styles from './index.module.css'
import { useState, useRef } from 'react'
import TripesCard from './tripesCard'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'

const Tripes = ({ data: countries }) => {
  const swp = useSelector((state) => state.renderSwiper.value)
  const [value, setValue] = useState(0)
  const filteredCountries =
    value === 0
      ? countries
      : value === 1
      ? countries.filter((country) => country?.type === 'out')
      : countries.filter((country) => country?.type === 'in')

  const tripesTabs = ['جميع الوجهات', 'الوجهات الخارجية', 'الوجهات الداخلية']
  return (
    <div className={styles.tripes}>
      <h2
        className={styles.tripes__title}
      >
        اختر وجهتك الان
      </h2>
      <div className={styles.tripes__container}>
        <div
          className={styles.tripes__tabs}
        >
          {tripesTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setValue(i)}
              className={`${styles.tripes__tab} ${
                value === i ? styles.tripes__tab__active : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
          {/* <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: true,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            grabCursor={true}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current,
            }}
            modules={[Navigation]}
            className={styles.tripes__content}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperPrevRef.current
              swiper.params.navigation.nextEl = swiperNextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            }}
          >
            {filteredCountries?.map((country) => (
              <SwiperSlide key={country.id} className={styles.tripes__slide}>
                <TripesCard item={country} />
              </SwiperSlide>
            ))}
            <div className={styles.swiper__prev} ref={swiperPrevRef}>
              <Image src='/prev-arrow-gray.svg' alt='' width={65} height={65} />
            </div>
            <div className={styles.swiper__next} ref={swiperNextRef}>
              <Image src='/next-arrow-gray.svg' alt='' width={65} height={65} />
            </div>
          </Swiper> */}
      </div>
      <Link href='/our-programs' className={styles.view__all}>
        عرض الكل
      </Link>
    </div>
  )
}

export default Tripes
