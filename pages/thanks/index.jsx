/* eslint-disable no-undef */
import Head from 'next/head'
import Image from 'next/image'
import ScrollDown from '../../components/scrollDown'
import Testimonials from '../../components/testimonials'
import styles from './index.module.css'
import { useSelector } from 'react-redux'

const Thanks = ({reviews, slides}) => {
  const settings = useSelector((state) => state.settings.value)
  return (
    <>
      <Head>
        <title>{slides[0]?.title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings.meta_description}
            />
            <meta property="og:title" content={settings.meta_title} />
            <meta property="og:url" content="https://last-delta.vercel.app/thanks" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content={settings.meta_title} />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
      </Head>
      <div className={`overflow-hidden ${styles.hero__bg}`}>
        {slides[0]?.image && (
          <Image src={slides[0]?.image} alt={slides[0]?.title} fill unoptimized={true} />
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
