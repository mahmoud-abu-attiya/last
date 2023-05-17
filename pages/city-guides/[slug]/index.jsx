import Breadcrumbs from '@/components/Breadcrumbs'
import Image from 'next/image'
import localFont from 'next/font/local'
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Head from 'next/head'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'

const noto = localFont({ src: '../../../public/fonts/NotoNaskhArabic-Regular.ttf' })

const Famose = ({ img, title }) => {
   const router = useRouter();
   const slug = router.query.slug;
   const data = [1, 2, 3, 4, 5, 6, 7, 8]
   const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 1,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1.5,
            }
         }
      ]
   };
   const handleClick = (id) => {
      router.push(`/city-guides/${slug}/${id}`)
   }
   return (
      <div className="my-4">
         <h2 className="text-xl md:text-2xl mb-4 mt-8">{title}</h2>
         <Slider {...settings} className=''>
            {data.map((slide, i) => {
               return (
                  <div key={i}>
                     <div className='group overflow-hidden mx-2 rounded-lg cursor-pointer' onClick={() => handleClick(i)}>
                        <div className='relative h-[250px] md:h-[370px] flex'>
                           <Image
                              src={img}
                              fill
                              alt={"any"}
                              className='w-full group-hover:scale-110 transition duration-1000 object-cover rounded-lg' />
                           <div className='relative text-white w-full mt-auto bg-gradient-to-t from-black/75 to-transparent flex flex-col items-start md:items-center justify-end p-4 text-center'>
                              <h3 className='text-xl'> تمثال أم الجورجيين</h3>
                              <p className="sup text-xs">تمثال أم الجورجيين هو عبارة عن تمثال من الألومنيوم طوله 20 متراً على هيئة امرأة في الزي الوطني الجورجي والذي أصبح رمزاً للمدينة.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               )
            })}
         </Slider>
      </div>
   )
}
const FamilyActivity = ({ title, img }) => {
   const router = useRouter();
   const slug = router.query.slug;
   const data = [1, 2, 3, 4, 5, 6, 7, 8]
   const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 1,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1.2,
            }
         }
      ]
   };
   const handleClick = (id) => {
      router.push(`/city-guides/${slug}/${id}`)
   }
   return (
      <div className="my-4">
         <h2 className="text-xl md:text-2xl mb-4 mt-8">{title}</h2>
         <Slider {...settings} className=''>
            {data.map((slide, i) => {
               return (
                  <div key={i} dir='rtl'>
                     <div className='group border dark:border-gray-700 dark:bg-gray-800 overflow-hidden mx-2 rounded-lg cursor-pointer' onClick={() => handleClick(i)}>
                        <div className="relative h-[13rem]">
                           <Image src={img} alt="any" fill className='object-cover' />
                        </div>
                        <div className="flex justify-between items-center px-4 py-8">
                           <div className="">
                              <h3>جينو بارادايس</h3>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>يحتوي مركز جينو بارادايس على ملاهي مائية رائع...</p>
                           </div>
                           {/* <i className="far fa-chevron-left text-xs"></i> */}
                           <FontAwesomeIcon icon={faChevronLeft} className='text-xs' />
                        </div>
                     </div>
                  </div>
               )
            })}
         </Slider>
      </div>
   )
}

export default function Daleel() {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(setBacktoData({ href: '/city-guides', title: 'الدليل السياحي' }))
   }, []);
   const settings = useSelector(state => state.settings.value)
   const data = {
      id: 1,
      title: "الدليل السياحي",
      desc: 'اكتشف معنا أروع وجهات السفر',
      image: "https://backend.elnagahtravels.com/storage/countries/VDHSwd11Kov6I5ZqcAfrptFR5vrl6WPN0a0n6ldb.jpg"
   }
   const list = [
      {
         title: data.title,
         href: "/city-guides"
      },
      {
         title: "الدولة",
      },
   ]
   return (
      <>
         <Head>
            <title>{data.title + " | " + list[1].title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings.meta_description}
            />
            <meta property="og:title" content={data.title + " | " + list[1].title} />
            <meta property="og:url" content="https://last-delta.vercel.app/city-guides" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content={data.title + " | " + list[1].title} />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
         </Head>
         <div className="w-full bg-secondary h-20 lg:h-40"></div>
         <div className="w-full h-[50vh] relative overflow-hidden flex">
            <Image src={data.image} alt="daleel" fill className='object-cover' />
            <div className="w-full relative z-10 bg-gradient-to-t from-black/75 to-transparent text-white py-4 mt-auto">
               <div className="container">
                  <h1 className="text-xl md:text-2xl">{data.title}</h1>
                  <p className="desc">{data.desc}</p>
               </div>
            </div>
         </div>
         <div className="container dark:text-white">
            <div className="border-b hidden lg:block dark:border-gray-700">
               <Breadcrumbs list={list} />
            </div>
            <p className={`my-4 md:my-6 max-w-3xl text-justify ${noto.className}`}>تعد جزر المالديف الوجهة السياحية الأنسب لعشاق البحر والشمس، فهي جزيرة ساحرة تضم العديد من الشواطئ الخلابة ذات المياه الكريستالية. استمتع بالرياضات المائية في المياه الصافية، وشاهد الشعاب المرجانية، تناول ألذ المأكولات البحرية، واستمتع بالرفاهية في أروع منتجعات الجزيرة التي تضمن لك تجربة ولا أروع. سواء كنت ترغب في الاسترخاء على الشاطئ ومشاهدة غروب الشمس، أو تخطّط للاستمتاع بتجربة فريدة في أفضل المنتجعات العالمية فإن جزر المالديف بطابعها الخاص تمنحك الأجواء المناسبة لتمضي أروع الأوقات.</p>
            <div className="my-4 md:my-6">
               <h2 className=''>مستجدات السفر</h2>
               <p className={`my-4 max-w-3xl ${noto.className}`}>تعرّف على آخر مستجدات السفر، إجراءات السلامة وقيود الدخول إلى جزر المالديف. <Link className='text-blue-500 hover:underline' href={"#"}>عرض التفاصيل</Link></p>
               <mark className={`my-4 max-w-3xl text-ellipsis ${noto.className}`}> <strong>ملاحظة:</strong> <em>قد تكون بعض المعالم المذكورة مغلقة حالياً نظراً للقيود المفروضة على الحركة</em></mark>
            </div>
            <div className="flibs flex gap-4 flex-wrap">
               <div className="flip-card text-center city_flip rounded-xl relative mx-auto md:m-0">
                  <div className="flip-card-inner city_flip_inner rounded-xl dark:border-gray-700 border">
                  <div className="flip-card-front w-full text-center city_flip_front rounded-xl dark:text-white dark:bg-gray-800 overflow-hidden flex flex-col items-center p-4 justify-between">                        <div></div>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={60} height={60} />
                        <div className="font-light mb-4">
                           أفضل الأوقات للزيارة
                        </div>
                     </div>
                     <div className={`flip-card-back text-center city_flip_back rounded-xl overflow-hidden dark:text-white dark:bg-gray-800 bg-white text-secondary p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 items-center`}>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={40} height={40} />
                        <div className={"text-primary"}>
                           أفضل الأوقات للزيارة
                        </div>
                        <p className='text-sm'>الصيف حار معتدل والشتاء بارد إلى حدٍ ما، مما يجعلها وجهة مناسبة للرحلات الاستكشافية الخارجية.</p>
                     </div>
                  </div>
               </div>
               <div className="flip-card text-center city_flip rounded-xl relative mx-auto md:m-0">
                  <div className="flip-card-inner city_flip_inner rounded-xl dark:border-gray-700 border">
                     <div className="flip-card-front w-full text-center city_flip_front rounded-xl dark:text-white dark:bg-gray-800 overflow-hidden flex flex-col items-center p-4 justify-between">
                        <div></div>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={60} height={60} />
                        <div className="font-light mb-4">
                           أفضل الأوقات للزيارة
                        </div>
                     </div>
                     <div className={`flip-card-back text-center city_flip_back rounded-xl overflow-hidden dark:text-white dark:bg-gray-800 bg-white text-secondary p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 items-center`}>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={40} height={40} />
                        <div className={"text-primary"}>
                           أفضل الأوقات للزيارة
                        </div>
                        <p className='text-sm'>الصيف حار معتدل والشتاء بارد إلى حدٍ ما، مما يجعلها وجهة مناسبة للرحلات الاستكشافية الخارجية.</p>
                     </div>
                  </div>
               </div>
               <div className="flip-card text-center city_flip rounded-xl relative mx-auto md:m-0">
                  <div className="flip-card-inner city_flip_inner rounded-xl dark:border-gray-700 border">
                     <div className="flip-card-front w-full text-center city_flip_front rounded-xl dark:text-white dark:bg-gray-800 overflow-hidden flex flex-col items-center p-4 justify-between">
                        <div></div>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={60} height={60} />
                        <div className="font-light mb-4">
                           أفضل الأوقات للزيارة
                        </div>
                     </div>
                     <div className={`flip-card-back text-center city_flip_back rounded-xl overflow-hidden dark:text-white dark:bg-gray-800 bg-white text-secondary p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 items-center`}>
                        <Image src={"https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/cityguides-import/best_time_visit_icon.svg"} alt="any" width={40} height={40} />
                        <div className={"text-primary"}>
                           أفضل الأوقات للزيارة
                        </div>
                        <p className='text-sm'>الصيف حار معتدل والشتاء بارد إلى حدٍ ما، مما يجعلها وجهة مناسبة للرحلات الاستكشافية الخارجية.</p>
                     </div>
                  </div>
               </div>
            </div>
            <Famose title="أشياء لازم تشوفها وتسويها بسفرتك" img="https://backend.elnagahtravels.com/storage/countries/qC3vI4nVvOEZx7h76w3w0A2IfIW7tnBlr7I7mxlt.jpg" />
            <FamilyActivity title="أنشطة لكل أفراد العائلة" img="https://backend.elnagahtravels.com/storage/countries/pR1zxpFn9HD2MD7U2HI6MJrht59Najs1K49Bzoij.jpg" />
            <Famose title="اكتشف ثقافة البلد وعاداته" img="https://backend.elnagahtravels.com/storage/countries/XzqoXv2ckJGaCQ1LLCIzBdLN7nQ4t0arOJGWDbP2.jpg" />
            <Famose title="أروع وجهات التسوق" img="https://backend.elnagahtravels.com/storage/countries/YurnHNmE6GpQeKn1I5zyv1JwilVeNWhkio4ymvJ7.jpg" />
            <FamilyActivity title="أروع المطاعم وأشهى المأكولات" img="https://backend.elnagahtravels.com/storage/countries/QumVlZgE6YAF5HtxJ0GQzrSNAjZgqliWBlFZ5Z9r.png" />
            <div className="text-center my-8 md:my-16 w-fit mx-auto">
               <div className='text-xl md:text-2xl mb-4'>هل تبحث عن رحلات إلى تبليسي؟</div>
               <Link href={"/our-programs"} className='p-4 bg-[#ef4050] text-white w-full block rounded-full'>بحث عن رحلات</Link>
            </div>
         </div>
      </>
   )
}
