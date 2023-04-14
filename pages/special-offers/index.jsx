import styles from './index.module.css'
import Head from 'next/head'
import SpecialCard from '../../components/special/specialCard'
import FullPageSlider from '../../components/fullPageSlider'

const SpecialOffers = ({slides, specialOffers}) => {
  return (
    <>
      <Head>
        <title>العروض المميزة</title>
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0].title}
        btnText={slides[0].button_text}
        btnUrl={'#content'}
      />
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
