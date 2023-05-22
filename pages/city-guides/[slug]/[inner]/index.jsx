import Image from 'next/image'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import localFont from 'next/font/local'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from 'next/router'
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBacktoData } from '@/slices/backto';

const noto = localFont({ src: '../../../../public/fonts/NotoNaskhArabic-Regular.ttf' })

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
                  <div key={i}>
                     <div className='group overflow-hidden mx-2 rounded-lg cursor-pointer' onClick={() => handleClick(i)}>
                        <div className='relative h-[250px] md:h-[370px] flex'>
                           <Image
                              src={img}
                              fill
                              alt={"any"}
                              className='w-full group-hover:scale-110 transition duration-1000 object-cover rounded-lg' />
                           <div className='relative text-white w-full mt-auto bg-gradient-to-t from-black/75 to-transparent flex flex-col items-start md:items-center justify-end p-4 text-center'>
                              <h2 className='text-xl'> تمثال أم الجورجيين</h2>
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

export default function Index() {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(setBacktoData({ title: "الدولة", href: "/city-guides/50",}))
   }, []);
   const settings = useSelector(state => state.settings.value)
   const list = [
      {
         title: "الديل السياحي",
         href: "/city-guides"
      },
      {
         title: "الدولة",
         href: "/city-guides/50",
      },
      {
         title: "اسم الوجهة",
      },
   ]
   return (
      <>
         <Head>
            <title>{list[0].title + " | " + list[1].title + " | " + list[2].title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings.meta_description}
            />
            <meta property="og:title" content={list[0].title + " | " + list[1].title + " | " + list[2].title} />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content={list[0].title + " | " + list[1].title + " | " + list[2].title} />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
         </Head>
         <div className="hidden md:block w-full bg-secondary h-20 lg:h-40"></div>
         <div className="w-full h-[50vh] relative overflow-hidden flex">
            <Image src={"https://backend.elnagahtravels.com/storage/countries/HSntLT00EeuGSCtN5PnMQFxZpp5Lnn14qaD08CXI.jpg"} alt="daleel" fill priority className='object-cover' />
            <div className="w-full relative z-10 bg-gradient-to-t from-black/75 to-transparent text-white py-4 mt-auto">
               <div className="container">
                  <h1 className="text-xl md:text-2xl">اسم الوجهة</h1>
               </div>
            </div>
         </div>
         <div className="container dark:text-white">
            <div className="border-b hidden md:block dark:border-gray-700">
               <Breadcrumbs list={list} />
            </div>
            <p className={`my-4 md:my-6 max-w-3xl text-justify ${noto.className}`}>تعد جزر المالديف الوجهة السياحية الأنسب لعشاق البحر والشمس، فهي جزيرة ساحرة تضم العديد من الشواطئ الخلابة ذات المياه الكريستالية. استمتع بالرياضات المائية في المياه الصافية، وشاهد الشعاب المرجانية، تناول ألذ المأكولات البحرية، واستمتع بالرفاهية في أروع منتجعات الجزيرة التي تضمن لك تجربة ولا أروع. سواء كنت ترغب في الاسترخاء على الشاطئ ومشاهدة غروب الشمس، أو تخطّط للاستمتاع بتجربة فريدة في أفضل المنتجعات العالمية فإن جزر المالديف بطابعها الخاص تمنحك الأجواء المناسبة لتمضي أروع الأوقات.</p>
            <Famose title="معالم سياحية أخرى" img="https://backend.elnagahtravels.com/storage/countries/qC3vI4nVvOEZx7h76w3w0A2IfIW7tnBlr7I7mxlt.jpg" />
         </div>
      </>
   )
}
