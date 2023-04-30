import styles from './index.module.css'
import BtnArrow from '@/components/BtnArrow'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector } from 'react-redux'

const SeaTripes = ({
  programs,
  slide,
}) => {
  const settings = useSelector((state) => state.settings.value)
  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
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
      <div className={styles.seaTripes__content} id='content'>
        <h2 className='main__title'>الرحلات البحرية</h2>
        <div className={styles.offer__cards}>
          {programs?.map((card) => (
            <div className={styles.offer__card} key={card.id}>
              <div className={styles.offer__card__container}>
                <div className={styles.offer__img__container}>
                  <Image
                    src={card?.image}
                    alt={card?.title}
                    fill
                    className={styles.offer__card__img}
                  />
                </div>
                <div className={styles.offer__card__content}>
                  <div className={styles.offer__card__period}>
                    <span>
                      <i className="fas fa-sun"></i>
                      {card?.days} أيام
                    </span>
                    <span>
                      <i className="fas fa-moon"></i>
                      {card?.nights} ليالي
                    </span>
                    {card?.people && (
                      <span>
                        <i className="fas fa-user-friends"></i>
                        {card?.people}
                      </span>
                    )}
                  </div>
                  <div className={styles.offer__heading}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <h3 className={styles.offer__card__title}>
                        {card.title}
                      </h3>
                    </a>
                    <div className={styles.stars}>
                      {Array.from(Array(card.rate)).map((s, i) => (
                        <i className="fas fa-star text-yellow-400" key={i}></i>
                      ))}
                    </div>
                  </div>
                  <div className={styles.offer__card__price}>
                    <div>
                      <span className={styles.new__price}>
                        {card?.price_after_discount}
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
                        {card?.price}
                      </span>
                    </p>
                  </div>
                  <p className={styles.sales}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                      <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
                    </svg>
                    وفر:
                    <span>{card?.price - card?.price_after_discount}</span>
                    ريال سعودي
                  </p>
                  <div className={styles.offer__card__btns}>
                    <BtnArrow
                      title='حجز العرض'
                      href={`https://api.whatsapp.com/send?phone=${settings?.whatsup
                        }&${message(card?.id)}`}
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
