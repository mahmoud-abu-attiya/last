import styles from './index.module.css'
import Head from 'next/head'
import Image from 'next/image'
import ScrollDown from '../../components/scrollDown'

const AboutUs = ({ about, slides }) => {
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
      </Head>
      <div className={`overflow-hidden ${styles.hero__bg}`}>
        {slides[0].image && (
          <Image src={slides[0].image} alt={slides[0].title} fill />
        )}
        <h1>{slides[0].title}</h1>
        <ScrollDown />
      </div>
      <div className={styles.about__us}>
        <div className={styles.about__us__best}>
          <h3 className='main__title'>انجازاتنا تتحدث عنا</h3>
          <div>
            <h5>وسام النجاح للسفر والسياحة</h5>
            <h6>وسام النجاح للسفر و السياحة تقف اليوم ـ بكل فخر</h6>
            {achievements.map((achievement) => (
              <p key={achievement?.title}>
                {/* <BsFillCircleFill /> */}
                <span>{achievement?.title}</span>
                <br /> - {achievement?.subtitle}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.about__us__options}>
        <div className={styles.about__us__options__img}>
          <Image fill src='/images/boat.gif' alt='' />
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
