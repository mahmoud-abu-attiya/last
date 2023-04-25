import styles from './index.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'


const Place = (props) => {
  const categories = props.categories
  const countries = props.countries
  const place = props.place
  const country = countries?.find((country) => country?.id === +place)
  return (
    country &&
    <>
      <Head>
        <title>{country.name}</title>
      </Head>
      <div className={styles.place}>
        <div
          className={styles.place__bg}
          style={{ backgroundImage: `url(${country?.image})` }}
        >
          <h1>{country?.name}</h1>
        </div>
        <div className={styles.place__grid}>
          {categories.length > 0 ? (
            categories[0]?.image &&
            categories.map((category) => (
              <Link
                href="/our-programs/[place]/[categoryId]"
                as={`/our-programs/${place}/${category?.id}`}
                key={category?.id} className={styles.place__card}
              >
                <Image
                  fill
                  src={category?.image}
                  alt={category?.name}
                  className={styles.place__card__img}
                />
                <h3>{category?.name}</h3>
              </Link>
            ))
          ) : (
            <h2>لا توجد نتائج</h2>
          )}
        </div>
      </div>
    </>

  )

}

export default Place

export const getServerSideProps = async (context) => {
  if (context.params.place) {
    const [response, countriesRes] = await Promise.all([
      fetch(
        `https://backend.elnagahtravels.com/public/api/programs/categories?country_id=${context.params.place}`
      ),
      fetch(
        `https://backend.elnagahtravels.com/public/api/countries?country_for=programs`
      ),
    ])
    const [{ categories = [] }, { countries = [] }] = await Promise.all([
      response.json(),
      countriesRes.json(),
    ])
    const country = countries?.find(el => {
      return el.id === parseInt(context.params.place)
    }
    )
    if (!country)
      return {
        notFound: true,
      }
    return {
      props: {
        categories,
        countries,
        place: context.params.place
      }
    }
  }

}
