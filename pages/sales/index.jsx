/* eslint-disable no-undef */
import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'

const Sales = ({slides, countries}) => {
  return (
    <>
      <Head>
        <title>الخصومات</title>
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0].title}
        btnText={slides[0].button_text}
        btnUrl={'#content'}
      />
      <div className={styles.sales__content} id='content'>
        <h2 className='main__title'>الخصومات</h2>
        <div className={styles.sales__grid}>
          {countries.map((country) => ( // reverse make mistake that text content dosen't on server side match with clint side
            <Link href={`/sales/${country.id}`} key={country.id}>
              <div className={styles.sales__card}>
                <Image
                  fill
                  src={country.image}
                  alt={"country name"}
                  className={styles.sales__card__img}
                />
                <h3>{country.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sales

export async function getServerSideProps() {
  const [slidesRes, countryRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=discounts'),
    fetch(
      'https://backend.elnagahtravels.com/public/api/countries?country_for=discounts'
    ),
  ])
  const [
    {
      data: { slide = [] },
    },
    { countries = [] },
  ] = await Promise.all([slidesRes.json(), countryRes.json()])

  return {
    props: {
      slides: slide,
      countries: countries,
    },
  }
}
