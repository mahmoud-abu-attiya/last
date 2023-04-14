import styles from './index.module.css'
// import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import SpecialCard from './specialCard'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Special = ({ data, settings }) => {
  return (
    <div className={styles.news__container}>
      <h3
        className={styles.news__title}
        // variants={topToBottomAnimation}
        // initial='hidden'
        // whileInView='show'
        // viewport={{ once: true }}
      >
        العروض المميزة
      </h3>
        {/* {swp && (<Swiper
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
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperPrevRef.current
            swiper.params.navigation.nextEl = swiperNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          className={styles.news__swiper}
        >
          {data.map((item) => (
            <SwiperSlide className={styles.news__swiper__slide} key={item?.id}>
              {item?.image && <SpecialCard item={item} settings={settings} />}
            </SwiperSlide>
          ))}
          <div className={styles.swiper__prev} ref={swiperPrevRef}>
            <Image src='/prev-arrow-gray.svg' alt='' width={65} height={65} />
            Prev
          </div>
          <div className={styles.swiper__next} ref={swiperNextRef}>
            <Image src='/next-arrow-gray.svg' alt='' width={65} height={65} />
            Next
          </div>
        </Swiper>)} */}
      <Link href='/special-offers' className={styles.view__all}>
        عرض الكل
      </Link>
    </div>
  )
}

export default Special
