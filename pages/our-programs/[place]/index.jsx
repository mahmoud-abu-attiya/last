import styles from './index.module.css'
import cartStyle from "./[categoryId]/index.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BtnArrow from '@/components/BtnArrow'
import Breadcrumbs from '@/components/Breadcrumbs'

const Place = (props) => {
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
    console.log(categories)
    fetch(`https://backend.elnagahtravels.com/public/api/programs?country_id=${place}&category_id=${id}`)
      .then(res => res.json()).then(res => {
        setAnim(true)
        setTimeout(() => {
          setData(res.programs)
          setAnim(false)
        }, 500)
      }).catch(err => console.log(err))
  }, [id])
  const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };
  return (
    <>
      <Head>
        <title>{country.name}</title>
      </Head>
      <div
        className={styles.place__bg}
        style={{ backgroundImage: `url(${country?.image})` }}
      >
        <h1>{country?.name}</h1>
        <Link href={"/our-programs"} className='rounded-full px-4 py-2 text-sm text-primary bg-gray-50 shadow-lg z-10 absolute bottom-4 block md:hidden right-4 bold'>عودة إلى الباقات</Link>
      </div>
      <Slider {...settings} className='w-full prog bg-gray-100 shadow'>
        {categories.map((category) => {
          return (
            <button onClick={() => setId(category.id)} key={category?.id} className={`bold transition duration-500 text-center py-4 ${id == category.id ? "border-b-4 border-primary text-primary bg-primary/25" : "text-black border-none"}`}>{category.name}</button>
          )
        })}
      </Slider>
      <div className="container hidden md:block">
        <Breadcrumbs list={[{title: 'البرامج السياحية', href: "/our-programs"}, {title: country.name, href: `/our-programs/${country.id}`}]} />
      </div>
      <div className="bg-gray-50">
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-16 transition duration-300 ${anim ? "opacity-0" : "opacity-100"}`}>
          {data ? data.map((item) => {
            return (
              <div className={cartStyle.offer__card} key={item.id}>
                <div className={cartStyle.offer__card__container}>
                  <div className={cartStyle.offer__img__container}>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={cartStyle.offer__card__img}
                      />
                    )}
                  </div>
                  <div className={`bg-white ${cartStyle.offer__card__content}`}>
                    <div className={cartStyle.offer__card__period}>
                      <span>
                        <i className="fas fa-sun"></i>
                        {item.days} أيام
                      </span>
                      <span>
                        <i className="fas fa-moon"></i>
                        {item.nights} ليالي
                      </span>
                      <span>
                        <i className="fas fa-map-marker-alt"></i>
                        {item.country.name}
                      </span>
                      {item.people && (
                        <span>
                          <i className="fas fa-user-friends"></i>
                          {item.people}
                        </span>
                      )}
                    </div>
                    <div className={cartStyle.offer__heading}>
                      <Link
                        href={`/our-programs/${place}/${id}/${item.id}`}
                      >
                        <h3 className={cartStyle.offer__card__title}>
                          {item.category.name} {item.rate} نجوم
                        </h3>
                      </Link>
                      <div className={styles.stars}>
                        {Array.from(Array(item.rate)).map((s, i) => (
                          <i className="fas fa-star text-yellow-400" key={i}></i>
                        ))}
                      </div>
                    </div>
                    <div className={cartStyle.offer__card__price}>
                      <div>
                        <span className={styles.new__price}>
                          {item.price_after_discount}
                        </span>{' '}
                        ريال سعودي
                      </div>
                    </div>
                    <div className={cartStyle.offer__card__btns}>
                      <BtnArrow
                        title='تفاصيل العرض'
                        href={`/our-programs/${place}/${id}/${item.id}`}
                      />
                      <BtnArrow
                        title='حجز العرض'
                        href={`https://api.whatsapp.com/send?phone=${settings?.whatsup
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
