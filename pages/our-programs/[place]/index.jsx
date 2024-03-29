/* eslint-disable no-undef */
import styles from './index.module.css'
// import style from "./[categoryId]/index.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnArrow from '@/components/BtnArrow'
import Breadcrumbs from '@/components/Breadcrumbs'
import CountryHero from '@/components/countryHero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faLocationPin, faUserFriends, faStar } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setBacktoData } from '@/slices/backto'

const Place = (props) => {
  const settings = useSelector((state) => state.settings.value)
  const en = useSelector((state) => state.langs.value)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ title: en ? "Tourism programmes" : 'البرامج السياحية', href: `/our-programs/` }))

  }, [])
  const categories = props.categories
  const countries = props.countries
  const place = props.place
  const country = countries?.find((country) => country?.id === +place)
  const [id, setId] = useState(categories[0]?.id)
  const [data, setData] = useState()
  const [anim, setAnim] = useState(false)
  const message = (id) => {
    const program = data?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  useEffect(() => {
    fetch(`https://backend.elnagahtravels.com/public/api/programs?country_id=${place}&category_id=${id}`)
      .then(res => res.json()).then(res => {
        setAnim(true)
        setTimeout(() => {
          setData(res.programs)
          setAnim(false)
        }, 500)
      }).catch(err => console.log(err))
  }, [id])
  const setting = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          dots: true,
        }
      }
    ]
  };
  return (
    <>
      <Head>
        <title>{country.name}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={settings.meta_description}
        />
        <meta property="og:title" content={settings.meta_title} />
        <meta property="og:url" content="https://last-delta.vercel.app/our-programs" />
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
      <CountryHero counrty="cairo" en={en} />
      <div className="bg-gray-50 dark:bg-gray-900 relative">
        <div className="container hidden md:grid absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-white overflow-x-auto" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
          {categories.map((category) => {
            return (
              <button onClick={() => setId(category.id)} key={category?.id} className={` border-t px-2 py-4 bold ${id == category.id ? "opacity-100" : "opacity-50"}`}>{category.name}</button>
            )
          })}
        </div>
      <div className="container hidden md:block border-b dark:border-gray-700">
        <Breadcrumbs list={[{ title: en ? "Tourism programmes" : 'البرامج السياحية', href: "/our-programs" }, { title: country.name }]} />
      </div>
        <div className="md:hidden">
          <Slider {...setting} className='w-full prog border-b dark:border-gray-700'>
            {categories.map((category) => {
              return (
                <button onClick={() => setId(category.id)} key={category?.id} className={`text-sm transition duration-500 text-center hover:bg-gray-400/25 py-4 ${id == category.id ? "border-b-4 border-primary dark:text-primary text-black bold" : "text-gray-500 border-none font-light"}`}>{category.name}</button>
              )
            })}
          </Slider>
        </div>
        <div className="container">
          {/* <div className=" hidden md:block">
            <Slider {...setting} className='w-full prog border-b dark:border-gray-700'>
              {categories.map((category) => {
                return (
                  <button onClick={() => setId(category.id)} key={category?.id} className={`text-sm transition duration-500 text-center hover:bg-gray-400/25 py-4 ${id == category.id ? "border-b-4 border-primary text-black dark:text-primary bold" : "text-gray-500 border-none font-light"}`}>{category.name}</button>
                )
              })}
            </Slider>
          </div> */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-16 transition duration-300 ${anim ? "opacity-0" : "opacity-100"}`}>
            {data ? data.map((item) => {
              return (
                <div className={styles.offer__card} key={item.id}>
                  <div className={styles.offer__card__container}>
                    <div className={styles.offer__img__container}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={styles.offer__card__img}
                          quality={30}
                        />
                      )}
                    </div>
                    <div className={`bg-white dark:bg-gray-800 dark:text-gray-50 ${styles.offer__card__content}`}>
                      <div className={`text-white dark:text-secondary ${styles.offer__card__period}`}>
                        <span>
                          <FontAwesomeIcon icon={faSun} />
                          {item.days} {en ? "Days" : "أيام"}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faMoon} />
                          {item.nights} {en ? "Nights" : "ليالي"}
                        </span>
                        <span title={item.country.name}>
                          <FontAwesomeIcon icon={faLocationPin} />
                          {item.country.name.slice(0, 10) + '...'}
                        </span>
                        {item.people && (
                          <span>
                            <FontAwesomeIcon icon={faUserFriends} />
                            {item.people}
                          </span>
                        )}
                      </div>
                      <div className={styles.offer__heading}>
                        <Link
                          href={`/our-programs/${place}/${id}/${item.id}`}
                        >
                          <h3 className={`text-secondary dark:text-white ${styles.offer__card__title}`}>
                            {en ? "Tourist programme" : "برنامج سياحي"} {item.rate} {en ? "Stars" : "نجوم"}
                            {/* {item.category.name} {item.rate} {en ? "Stars" : "نجوم"} */}
                          </h3>
                        </Link>
                        <div className={styles.stars}>
                          {Array.from(Array(item.rate)).map((s, i) => (
                            <FontAwesomeIcon icon={faStar} key={i} className='text-yellow-400' />
                          ))}
                        </div>
                      </div>
                      <div className={styles.offer__card__price}>
                        <div>
                          <span className={styles.new__price}>
                            {item.price_after_discount}
                          </span>{' '}
                          {en ? "SR" : "ريال سعودي"}
                        </div>
                      </div>
                      <div className={styles.offer__card__btns}>
                        <BtnArrow
                          title={en ? "Offer details" : 'تفاصيل العرض'}
                          href={`/our-programs/${place}/${id}/${item.id}`}
                        />
                        <BtnArrow
                          title={en ? "Book Offer" : "حجز العرض"}
                          href={`https://api.whatsapp.com/send?phone=${settings.whatsup
                            }&${message(item?.id)}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : <h2>loading...</h2>}
          </div>
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
