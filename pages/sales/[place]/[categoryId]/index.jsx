import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import BtnArrow from '@/components/BtnArrow'
import Head from 'next/head'
import ScrollDown from '../../../../components/scrollDown'
import { useSelector } from 'react-redux'

const Offer = (props) => {
  const programs = props.programs
  const settings = useSelector((state) => state.settings.value)
  const place = props.place
  const categoryId = props.categoryId
  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  return (
    <>
      <Head>
        <title>
          {`${programs[0]?.category?.name} - ${programs[0]?.country?.name}`}
        </title>
      </Head>
      <div className={styles.offer__bg}>
        {programs[0]?.country?.image && (
          <Image
            src={programs[0]?.country?.image}
            alt={programs[0]?.country?.name}
            fill
            unoptimized={true}
          />
        )}
        <h1>
          {programs[0]?.category?.name} - {programs[0]?.country?.name}
        </h1>
        <ScrollDown />
      </div>
      <div className={styles.offer}>
        <div className={styles.offer__cards}>
          {programs.length !== 0 ? (
            programs.map((program) => (
              <div className={styles.offer__card} key={program.id}>
                <div className={styles.offer__card__container}>
                  <div className={styles.offer__img__container}>
                    {program.image && (
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className={styles.offer__card__img}
                      />
                    )}
                  </div>
                  <div className={styles.offer__card__content}>
                    <div className={styles.offer__card__period}>
                    <span>
                        {/* <BsFillSunFill /> */}
                        <i className="fas fa-sun"></i>
                        {program.days} أيام
                      </span>
                      <span>
                        {/* <BsFillMoonFill /> */}
                        <i className="fas fa-moon"></i>
                        {program.nights} ليالي
                      </span>
                      <span>
                        {/* <MdLocationOn /> */}
                        <i className="fas fa-map-marker-alt"></i>
                        {program.country.name}
                      </span>
                      {program.people && (
                        <span>
                          {/* <BsFillPeopleFill /> */}
                          <i className="fas fa-user-friends"></i>
                          {program.people}
                        </span>
                      )}
                    </div>
                    <div className={styles.offer__heading}>
                      <Link
                        href={`/sales/${place}/${categoryId}/${program.id}`}
                      >
                          <span className={styles.offer__card__title}>
                            {program?.category?.name} {program.rate} نجوم
                          </span>
                      </Link>
                      <div className={styles.stars}>
                        {Array.from(Array(program.rate)).map((s, i) => (
                           <i className="fas fa-star text-yellow-400" key={i}></i>
                        ))}
                      </div>
                    </div>
                    <div className={styles.offer__card__price}>
                      <div>
                        <span className={styles.new__price}>
                          {program.price_after_discount}
                        </span>{' '}
                        ريال سعودي
                      </div>
                      <div>
                        بدلا من
                        <span className={styles.old__price}>
                          {program.price}
                        </span>
                      </div>
                    </div>
                    <p className={styles.sales}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                      >
                        <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
                      </svg>
                      وفر:
                      <span>
                        {+program.price - +program.price_after_discount}
                      </span>
                      ريال سعودي
                    </p>
                    <div className={styles.offer__card__btns}>
                      <BtnArrow
                        title='تفاصيل العرض'
                        href={`/sales/${place}/${categoryId}/${program.id}`}
                      />
                      <BtnArrow
                        title='حجز العرض'
                        href={`https://api.whatsapp.com/send?phone=${
                          settings?.whatsup
                        }&${message(program?.id)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>لا توجد برامج</h2>
          )}
        </div>
      </div>
    </>
  )
}

export default Offer



export const getServerSideProps = async(context)=>{
  const place = context.params.place
  const categoryId = context.params.categoryId
  if(place && categoryId){
    try {
      const programsRes = await fetch(`https://backend.elnagahtravels.com/public/api/discounts?country_id=${place}&category_id=${categoryId}`)
    const { discounts = [] } = await programsRes.json()

    // console.log(discounts)
    if(discounts.length === 0)
    return {
      notFound: true,
    }
    return {
      props : {
        programs :discounts ,
        categoryId,
        place
      }
    }
  } catch (error) {
    console.log(error)
  }
}
}