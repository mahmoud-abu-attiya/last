import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedBtn from '../../../../components/animatedBtn'
// import { BsFillSunFill, BsFillMoonFill, BsFillPeopleFill } from 'react-icons/bs'
// import { MdLocationOn } from 'react-icons/md'
// import { AiFillStar } from 'react-icons/ai'
import Head from 'next/head'
import ScrollDown from '../../../../components/scrollDown'

const Offer = (props) => {
  const router = useRouter();
  const {
    query: { place, categoryId },
  } = router;
  const programs = props.programs
  const settings = props.settings

  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  return (
    <>
      <Head>
        {programs[0]?.category?.name && (
          <title>
            {`${programs[0]?.category?.name} - ${programs[0]?.country?.name}`}
          </title>
        )}
      </Head>
      <div className={styles.offer__bg}>
        {programs[0]?.country?.image && (
          <Image
            src={programs[0]?.country?.image}
            alt={programs[0]?.country?.name}
            fill
          />
        )}
        <h1>
          {programs[0]?.category?.name} - {programs[0]?.country?.name}
        </h1>
        <ScrollDown />
      </div>
      <div className={styles.offer}>
        <div className={styles.offer__cards}>
          {programs.length > 0 ? (
            programs.map((program) => (
              <div className={styles.offer__card} key={program.id}>
                <div className={styles.offer__card__container}>
                  <div className={styles.offer__img__container}>
                    {program?.image && (
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
                        {program.days} أيام
                      </span>
                      <span>
                        {/* <BsFillMoonFill /> */}
                        {program.nights} ليالي
                      </span>
                      <span>
                        {/* <MdLocationOn /> */}
                        {program.country.name}
                      </span>
                      {program.people && (
                        <span>
                          {/* <BsFillPeopleFill /> */}
                          {program.people}
                        </span>
                      )}
                    </div>
                    <div className={styles.offer__heading}>
                      <Link
                        href={`/our-programs/${place}/${categoryId}/${program.id}`}
                      >
                        <a>
                          <h3 className={styles.offer__card__title}>
                            {program?.category?.name} {program.rate} نجوم
                          </h3>
                        </a>
                      </Link>
                      <div className={styles.stars}>
                        {Array.from(Array(program.rate)).map((s, i) => (
                          // <AiFillStar key={i} />
                          <span key={i} /> // remove
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
                    </div>
                    <div className={styles.offer__card__btns}>
                      <AnimatedBtn
                        text='تفاصيل العرض'
                        textColor='#222'
                        url={`/our-programs/${place}/${categoryId}/${program.id}`}
                      />
                      <AnimatedBtn
                        text='حجز العرض'
                        textColor='#222'
                        url={`https://api.whatsapp.com/send?phone=${
                          settings?.whatsup
                        }&${message(program?.id)}`}
                        target='_blank'
                        rel='noreferrer'
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

export const getServerSideProps = async (context)=>{
  const place  = context.params.place
  const categoryId  = context.params.categoryId
  if(place && categoryId){
    try {
      const [programsRes, settingsRes] = await Promise.all([
        fetch(
          `https://backend.elnagahtravels.com/public/api/programs?country_id=${place}&category_id=${categoryId}`
      ),
      fetch('https://backend.elnagahtravels.com/public/api/settings'),
    ])
    const [{ programs = [] }, { settings = {} }] = await Promise.all([
      programsRes.json(),
      settingsRes.json(),
    ])
    
    if(programs.length === 0)
    return {
      notFound: true,
    }
    return {
      props : {
        programs ,
        settings
      }
    }
  } catch (error) {
    console.log(error)
  }
}
}