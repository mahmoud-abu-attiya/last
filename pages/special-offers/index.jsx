/* eslint-disable no-undef */
// import styles from './index.module.css'
import Head from 'next/head'
// import SpecialCard from '../../components/special/specialCard'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector } from 'react-redux'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'
import { useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const SpecialOffers = ({ slides, specialOffers }) => {
  const settings = useSelector(state => state.settings.value);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
    console.log(specialOffers);
  }, [])
  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
    <>
      <Head>
        <title>العروض المميزة</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta property="og:title" content="العروض المميزة" />
        <meta property="og:url" content="https://last-delta.vercel.app/special-offers" />
        <meta name="keywords" content={settings.keywords} />
        <meta
          property="og:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta name="twitter:title" content="العروض المميزة" />
        <meta
          name="twitter:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
      </Head>
      <FullPageSlider
        data={slides}
        title={slides[0].title}
        btnText={slides[0].button_text}
        btnUrl={'#content'}
      />
      <div className="container hidden md:block border-b dark:border-gray-700">
        <Breadcrumbs list={[{ title: "العروض المميزة" }]} />
      </div>
      <div className={"container py-20"} id='content'>
        <h2 className='main__title'>العروض المميزة</h2>
        <p className=' max-w-4xl text-center mx-auto mb-14'>سواء كنت رحالة تحب البحث عن كنوز التاريخ المخفية في المملكة العربية السعودية أو من عُشاق المغامرة دائمي البحث عن التجارب المثيرة، فإن باقات عطلات المسافر هي حتماً ما تبحث عنه! إذا كنت تريد اكتشاف الوجهات المحلية، فنحن نوفر لك باقاتٍ تأخذك إلى وجهات جميلة داخل المملكة حيث يمكنك الاستمتاع بالمناظر الخلابة والأنشطة المثيرة</p>
        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
          {specialOffers.map((card) => (
            // <SpecialCard item={card} />
            <div className="item group hover:shadow-lg transition relative h-60 rounded-lg overflow-hidden" key={card?.id}>
              <Image src={card.image} alt={card.title || "text"} fill className='object-cover' />
              <div className="w-full group-hover:opacity-100 opacity-0 transition duration-300 h-full p-3 xl:p-4 flex justify-end gap-4 flex-col bg-gradient-to-t from-white to-white/75 relative text-black">
                <div className='flex gap-2 items-center bold'>
                  <FontAwesomeIcon icon={faUser} className='text-primary' />
                  {card.people === "شخصين" ? "2" : card.people}
                </div>
                <p className='bold text-xs md:text-sm'>سواء كنت رحالة تحب البحث عن كنوز التاريخ المخفية في المملكة العربية السعودية أو من...</p>
                <div className="btns flex justify-between bold">
                  <Link href={`/special-offers/${card.id}`} className='flex gap-1 items-center group bold bg-primary shadow-md rounded-md text-white px-3 py-2 text-xs' >
                    التفاصيل
                    <span className={"0"}>
                      <FontAwesomeIcon icon={faArrowLeft} className='' />
                    </span>
                  </Link>
                  <Link
                    className={"flex gap-1 items-center group bold bg-primary shadow-md rounded-md text-white px-3 py-2 text-xs"}
                    href={`https://api.whatsapp.com/send?phone=${settings.whatsup}&${message}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    حجر العرض
                    <span className={"0"}>
                      <FontAwesomeIcon icon={faArrowLeft} className='' />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SpecialOffers


export async function getServerSideProps() {
  const [slidesRes, offerRes] = await Promise.all([
    fetch(
      'https://backend.elnagahtravels.com/public/api/slides?page=special_offers'
    ),
    fetch('https://backend.elnagahtravels.com/public/api/special_offers'),
  ])
  const [
    {
      data: { slide = [] },
    },
    { special_offers = [] },
  ] = await Promise.all([slidesRes.json(), offerRes.json()])
  return {
    props: {
      slides: slide,
      specialOffers: special_offers,
    },
  }
}
