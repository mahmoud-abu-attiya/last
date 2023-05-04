/* eslint-disable no-undef */
import styles from './index.module.css'
import Head from 'next/head'
import SpecialCard from '../../components/special/specialCard'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector } from 'react-redux'
import Breadcrumbs from '@/components/Breadcrumbs'

const SpecialOffers = ({slides, specialOffers}) => {
  const settings = useSelector(state => state.settings.value);
  return (
    <>
      <Head>
        <title>العروض المميزة</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta property="og:title" content="العروض المميزة" />
        <meta property="og:url" content="https://last-delta.vercel.app/special-offers" />
        <meta name="keywords" content={settings?.keywords} />
        <meta
          property="og:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta name="twitter:title" content="العروض المميزة" />
        <meta
          name="twitter:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0].title}
        btnText={slides[0].button_text}
        btnUrl={'#content'}
      />
      <div className="container hidden md:block border-b">
        <Breadcrumbs list={[{ title: "العروض المميزة" }]} />
      </div>
      <div className={styles.offers__content} id='content'>
        <h2 className='main__title'>العروض المميزة</h2>
        <div className={styles.offers__grid}>
          {specialOffers.map((card) => (
            <SpecialCard item={card} key={card?.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SpecialOffers


export async function getServerSideProps() {
  const [slidesRes, offerRes] = await Promise.all([
    fetch(
      'https://backend.elnagahtravels.com/public/api/slides?page=special_offers'
    ),
    fetch('https://backend.elnagahtravels.com/public/api/special_offers'),
  ])
  const [
    {
      data: { slide = [] },
    },
    { special_offers = [] },
  ] = await Promise.all([slidesRes.json(), offerRes.json()])
  return {
    props: {
      slides: slide,
      specialOffers: special_offers,
    },
  }
}
