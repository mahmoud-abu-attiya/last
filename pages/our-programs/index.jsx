import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'

const OurPrograms = ({ countries, slides }) => {
  return (
    <>
      <Head>
        <title>البرامج السياحية</title>
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0]?.title}
        btnText={slides[0]?.button_text}
        btnUrl={'#content'}
      />
      <div className={styles.programs__content} id='content'>
        <h2 className='main__title'>البرامج السياحية</h2>
        <div className={styles.programs__grid}>
          {countries.reverse().map((country) => (
              <Link 
              href="/our-programs/[place]"
              as={`/our-programs/${country.id}`} 
              key={country.id} className={styles.programs__card}>
                  <Image
                    fill
                    objectFit='cover'
                    src={country.image}
                    alt={'country image'}
                    className={styles.programs__card__img}
                  />
                  <h3>{country.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    </>
  )
}

export default OurPrograms

export async function getServerSideProps() {
  const [countryRes, slidesRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/countries?country_for=programs').then(res => res.json()),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=programs').then(res => res.json()),
  ]);

  const countries = countryRes.countries;
  const slides = slidesRes.data.slide;

  return { props: { countries, slides } };
}