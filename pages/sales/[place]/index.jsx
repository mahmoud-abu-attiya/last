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
    <>
      <Head>
        <title>{country?.name}</title>
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
            categories?.map((category) => (
              <Link href={`/sales/${place}/${category.id}`} key={category.id}>
                <div className={styles.place__card}>
                  <Image
                    fill
                    src={category?.image}
                    alt={category?.name}
                    className={styles.place__card__img}
                  />
                  <h3>{category?.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <h2>لا توجد خصومات في الوقت الحالي, انتظرالخصومات</h2>
          )}
        </div>
      </div>
    </>
  )
}

export default Place

export const getServerSideProps = async (context)=>{
  const place = context.params.place
  try {
    if(place){
      const [response, countriesRes] = await Promise.all([
        fetch(
          `https://backend.elnagahtravels.com/public/api/discounts/categories?country_id=${place}`
          ),
          fetch(
            `https://backend.elnagahtravels.com/public/api/countries?country_for=discounts`
            ),
          ])
          const [{ categories = [] }, { countries = [] }] = await Promise.all([
            response.json(),
            countriesRes.json(),
          ])
        const country = countries?.find((country) => country?.id === +place)
        if(!country)
        return {
      notFound: true,
        }
          return {
            props : {
              categories,
              countries,
              place
            }
          }
        }
  }
  catch (error) {
    console.log(error)
  }
}