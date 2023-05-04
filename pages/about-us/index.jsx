/* eslint-disable no-undef */
import styles from './index.module.css'
import Head from 'next/head'
import Image from 'next/image'
import ScrollDown from '../../components/scrollDown'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const AboutUs = ({ about, slides }) => {
  const settings = useSelector(state => state.settings.value)
  const { images = [], achievements = [], steps = [] } = about
  const imagesStyles = [
    "",
    styles.v__stretch,
    styles.h__stretch,
    "",
    "",
    "",
    styles.v__stretch,
    styles.big__stretch,
    "",
    styles.h__stretch,
  ]
  return (
    <>
      <Head>
        <title>{slides[0].title}</title>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <meta
            name="description"
            content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta property="og:title" content={slides[0].title} />
        <meta property="og:url" content="https://last-delta.vercel.app/about-us" />
        <meta name="keywords" content={settings.keywords} />
        <meta
            property="og:description"
            content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta name="twitter:title" content={slides[0].title} />
        <meta
            name="twitter:description"
            content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
      </Head>
      <div className={`overflow-hidden ${styles.hero__bg}`}>
        {slides[0].image && (
          <Image src={slides[0].image} alt={slides[0].title} loading='eager' fill className='object-cover' />
        )}
        <h1>{slides[0].title}</h1>
        <ScrollDown />
      </div>
      <div className={styles.about__us}>
        <div className={styles.about__us__best}>
          <h2 className='main__title'>انجازاتنا تتحدث عنا</h2>
          <div>
            <div className='text-xl m-0 p-3 text-white bold bg-secondary'>وسام النجاح للسفر والسياحة</div>
            <div className='border-b-2 border-primary mt-4 py-2 bold'>وسام النجاح للسفر و السياحة تقف اليوم ـ بكل فخر</div>
            {achievements.map((achievement) => (
              <p key={achievement?.title}>
                {/* <BsFillCircleFill /> */}
                <FontAwesomeIcon icon={faCircle} className='text-primary' />
                <span>{achievement?.title}</span>
                <br /> - {achievement?.subtitle}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.about__us__options}>
        <div className={styles.about__us__options__img}>
          <Image fill src='/images/boat.gif' alt='' className='object-cover' />
        </div>
        <div className={styles.about__us__cards}>
          {steps.map((card) => (
            <div className={styles.about__us__card} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.about__us__grid}>
        {images.map((image, i) => (
          <div key={i} className={ imagesStyles[i] }>
            <Image src={image.image} alt="about" fill className='cover' />
          </div>
        ))}
      </div>
    </>
  )
}

export default AboutUs;

export async function getServerSideProps() {
  const [aboutRes, slideRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/about'),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=about'),
  ])
  const [
    data,
    {
      data: { slide = [] },
    },
  ] = await Promise.all([aboutRes.json(), slideRes.json()])
  return {
    props: {
      about: data,
      slides: slide,
    },
  }
}
