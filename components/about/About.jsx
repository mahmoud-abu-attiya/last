import styles from './index.module.css'
import { useState } from 'react'
import Image from 'next/image'
import BtnArrow from '../BtnArrow'

const About = ({ data, en }) => {
  const [value, setValue] = useState(0)
//   useEffect(() => {
//     console.log(data);
//  }, []);
  return (
    <div className={styles.about} id='about'>
      <div className={styles.about__container}>
        <div className={styles.about__container__top}>
          <h2
            className={styles.about__title}
          >
            {en ? "About Wesam El-Nagah" : "عن وسام النجاح"}
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
                {en ? tab.title_en : tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* Content */}
        {data.map((img, i) => (
          <div
            key={i}
            style={{
              zIndex: '-1',
            }}
            className='absolute w-full h-full top-0 left-0'
          >
              <Image
                src={img.image}
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
              {en ? data[value].subtitle_en : data[value].subtitle}
            </h3>
            <div
              className={styles.about__item__content}
            >
              <p className={styles.about__item__text}>{en ? data[value].content_en : data[value].content}</p>
              <BtnArrow title={en ? data[value].title_en : data[value].title} href={'/contact'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
