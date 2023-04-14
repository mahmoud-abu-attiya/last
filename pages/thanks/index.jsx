import Head from 'next/head'
import Image from 'next/image'
import ScrollDown from '../../components/scrollDown'
import Testimonials from '../../components/testimonials'
import styles from './index.module.css'

const Thanks = ({reviews, slides}) => {
  return (
    <>
      <Head>
        <title>{slides[0]?.title}</title>
      </Head>
      <div className={styles.hero__bg}>
        {slides[0]?.image && (
          <Image src={slides[0]?.image} alt={slides[0]?.title} fill />
        )}
        <h1>{slides[0]?.title}</h1>
        <ScrollDown />
      </div>
      <Testimonials data={reviews} />
    </>
  )
}

export default Thanks


export async function getServerSideProps() {
  const [reviewsRes, slidesRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/reviews'),
    fetch(
      'https://backend.elnagahtravels.com/public/api/slides?page=reviews'
    ),
  ])
  const [
    { reviews = [] },
    {
      data: { slide = [] },
    },
  ] = await Promise.all([reviewsRes.json(), slidesRes.json()])
  return {
    props: {
      reviews,
      slides: slide,
    },
  }
}
