/* eslint-disable no-undef */
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector } from 'react-redux'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'
import { useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const SpecialOffers = ({ slides, specialOffers }) => {
  const settings = useSelector(state => state.settings.value);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
    console.log(specialOffers);
  }, [])
  // const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
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
      <div className={"container py-12 md:py-20"} id='content'>
        <h2 className='main__title'>العروض المميزة</h2>
        <p className=' max-w-4xl mx-auto mb-14 text-justify dark:text-white'>سواء كنت رحالة تحب البحث عن كنوز التاريخ المخفية في المملكة العربية السعودية أو من عُشاق المغامرة دائمي البحث عن التجارب المثيرة، فإن باقات عطلات المسافر هي حتماً ما تبحث عنه! إذا كنت تريد اكتشاف الوجهات المحلية، فنحن نوفر لك باقاتٍ تأخذك إلى وجهات جميلة داخل المملكة حيث يمكنك الاستمتاع بالمناظر الخلابة والأنشطة المثيرة</p>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"}>
          {specialOffers.map((card, i) => (
            <div key={i} dir='rtl'>
              <Link href={`/special-offers/${card.id}`} className='group shadow-md border block dark:border-gray-700  overflow-hidden mx-2 rounded-lg cursor-pointer'>
                <div className="relative h-[13rem]">
                  <Image src={card.image} alt="any" fill quality={50} className='object-cover' />
                </div>
                <div className="flex justify-between items-center px-4 py-8 bg-gray-100  dark:text-white  dark:bg-gray-800">
                  <div className="">
                    <h3>جينو بارادايس</h3>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>يحتوي مركز جينو بارادايس على ملاهي مائية رائع...</p>
                  </div>
                  <FontAwesomeIcon icon={faChevronLeft} className='text-xs' />
                </div>
              </Link>
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
