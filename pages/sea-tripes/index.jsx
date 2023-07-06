/* eslint-disable no-undef */
import styles from './index.module.css'
import BtnArrow from '@/components/BtnArrow'
import Image from 'next/image'
import { useEffect } from 'react'
import { setBacktoData } from '@/slices/backto'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faUserFriends, faStar } from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/Breadcrumbs'

const SeaTripes = ({
  programs,
  slide,
}) => {
  const settings = useSelector((state) => state.settings.value)
  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
  }, [])
  return (
    <>
      <Head>
        <title>الرحلات البحرية</title>
        <title>{settings.meta_title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={settings.meta_description}
        />
        <meta property="og:title" content={settings.meta_title} />
        <meta property="og:url" content="https://last-delta.vercel.app/" />
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
      <FullPageSlider
        data={slide}
        title={slide[0].title}
        btnText={slide[0].button_text}
        btnUrl={'#content'}
      />
      <div className="container hidden md:block border-b dark:border-gray-700">
        <Breadcrumbs list={[{ title: "الرحلات البحرية" }]} />
      </div>
      <div className={styles.seaTripes__content} id='content'>
        <h2 className='main__title'>الرحلات البحرية</h2>
        <p className='max-w-2xl text-justify mb-8 mx-auto dark:text-gray-300'> غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.  غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.</p>
        <div className={styles.offer__cards}>
          {programs.map((card) => (
            <div className={styles.offer__card} key={card.id}>
              <div className={styles.offer__card__container}>
                <div className={styles.offer__img__container}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={styles.offer__card__img}
                    quality={50}
                  />
                  <div className="absolute text-xs py-1 px-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full top-4 left-4 z-10">تأشيرة سهلة</div>
                </div>
                <div className={` dark:bg-gray-900 dark:text-white flex flex-col gap-4 ${styles.offer__card__content}`}>
                  <div className={styles.offer__card__period}>
                    <span>
                      <FontAwesomeIcon icon={faSun} />
                      {card.days} أيام
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faMoon} />
                      {card.nights} ليالي
                    </span>
                    {card.people && (
                      <span>
                        <FontAwesomeIcon icon={faUserFriends} />
                        {card.people}
                      </span>
                    )}
                  </div>
                  <div className={styles.offer__heading}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h3 className={styles.offer__card__title}>
                        {card.title}
                      </h3>
                    </a>
                    <div className={styles.stars}>
                      {Array.from(Array(card.rate)).map((s, i) => (
                        <FontAwesomeIcon icon={faStar} key={i} className='text-yellow-400' />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs">
                    المانيا - بلجيكا - هولندا - فرنسا - سويسرا
                  </div>
                  <div className={styles.offer__card__price}>
                    <div>
                      <span className={styles.new__price}>
                        {card.price_after_discount}
                      </span>{' '}
                      ريال سعودي
                    </div>
                    <p
                      style={{
                        display: 'flex',
                        justifyContent: ' flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <span>بدلا من</span>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          fontSize: '1rem',
                          marginRight: '.5rem',
                        }}
                      >
                        {card.price}
                      </span>
                    </p>
                  </div>
                  <p className={`dark:bg-green-600/50 bg-green-300/50 rounded ${styles.sales}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                      <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
                    </svg>
                    وفر:
                    <span>{card.price - card.price_after_discount}</span>
                    ريال سعودي
                  </p>
                  <div className={styles.offer__card__btns}>
                    <BtnArrow
                      title='حجز العرض'
                      href={`https://api.whatsapp.com/send?phone=${settings.whatsup
                        }&${message(card.id)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SeaTripes;


export async function getServerSideProps() {
  const [programsRes, slidesRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/sea_trips'),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=sea-trips'),
  ])

  const [
    { programs = [] },
    {
      data: { slide = [] },
    },
  ] = await Promise.all([
    programsRes.json(),
    slidesRes.json(),
  ])

  return {
    props: {
      programs,
      slide,
    }
  }
}
