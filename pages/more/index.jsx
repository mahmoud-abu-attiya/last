import Head from "next/head"
import { useSelector, useDispatch } from "react-redux"
import Breadcrumbs from "@/components/Breadcrumbs"
// import Image from "next/image"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faLocationDot, faTimes, faPlaneDeparture, faShip, faTrophy, faCampground, faCar, faTrain, faCameraRetro, faGlobeAfrica, faThList, faPassport, faCouch, faUniversalAccess, faMap } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { setBacktoData } from "@/slices/backto"
import localFont from 'next/font/local';

const noto = localFont({ src: '../../public/fonts/NotoNaskhArabic-Regular.ttf' })

const Item = ({ data, border }) => {
   const settings = useSelector(state => state.settings.value)
   const [open, setOpen] = useState(false)
   useEffect(() => {
      if (open) {
         document.body.style.overflow = "hidden"
      } else {
         document.body.style.overflow = "unset"
      }
   }, [open])
   return (
      <>
         <div
            onClick={() => setOpen(true)}
            className={`${border ? "border-l" : "border-none"} more_item grow dark:border-gray-700 group my-6 lg:my-0 px-2 md:px-4 flex flex-row md:flex-col items-center w-40 justify-start md:justify-center cursor-pointer gap-4`}>
            {/* <Image src={data.img} alt={data.name} width={48} height={48} className="group-hover:-translate-y-2 group-hover:drop-shadow-md transition duration-300" /> */}
            <FontAwesomeIcon icon={data.icon} className="text-primary text-5xl group-hover:-translate-y-2 drop-shadow-md transition duration-300" />
            <h3 className={`text-xs lg:text-sm text-gray-500 dark:text-gray-300 font-light ${noto.className}`}>{data.name}</h3>
         </div>
         <div style={{ zIndex: "70" }} className={`${open ? "block" : "hidden"} fixed top-0 w-full h-full left-0 flex items-center justify-center`}>
            <div className="w-full absolute top-0 left-0 h-full bg-black/50 backdrop-blur" onClick={() => setOpen(false)}></div>
            <div className="relative mx-auto w-[90%] max-w-md max-h-[90%]">
               <div className="absolute top-0 left-0 cursor-pointer rounded-t text-white translate-x-0 -translate-y-full bg-primary flex gap-4 px-4 py-2 text-xs" onClick={() => setOpen(false)}>
                  اغلاق
                  <FontAwesomeIcon icon={faTimes}/>
               </div>
            <div className="bg-white dark:bg-gray-900 rounded-b-lg border-t-4 shadow-lg border-primary overflow-auto">
               <div className="grid grid-cols-1 md:grid-cols-6 p-4 items-center gap-4 border-b-4 border-gray-300 dark:border-gray-700">
                  <div className="flex text-center items-center flex-col gap-4 md:col-span-2">
                     {/* <Image src={data.img} alt={data.name} width={58} height={58} /> */}
                     <FontAwesomeIcon icon={data.icon} className="text-primary text-5xl drop-shadow-md" />
                     <h3 className="">{data.name}</h3>
                  </div>
                  <div className="md:col-span-4 md:p-4 md:border-r dark:border-gray-700">
                     <h4 className="hidden md:block">لمحة</h4>
                     <p className="text-gray-600 dark:text-gray-300 text-xs md:mt-4 text-justify">{data.desc}</p>
                  </div>
               </div>
               <div className="flex flex-col p-4">
                  <div className="border-b mdp-4 dark:border-gray-700">
                     <h4>كيف تحجز باقتك</h4>
                     <p className="text-gray-600 dark:text-gray-300 text-sm my-4">يمكنك زيارة أي من فروعنا أو التواصل معنا عبر مركز الاتصال لحجز باقة البرنامج التعليمي.</p>
                  </div>
                  <div className="border-b dark:border-gray-700 flex p-4 gap-4 items-center">
                     <FontAwesomeIcon icon={faPhone} className="text-primary text-5xl" />
                     <Link href={settings.phone} className="text-start">
                        <span className="text-xs text-gray-500 dark:text-gray-300">تواصل معنا</span>
                        <h5>{settings.phone}</h5>
                     </Link>
                  </div>
                  <div className="flex p-4 gap-4 items-center">
                     <FontAwesomeIcon icon={faLocationDot} className="text-primary text-5xl" />
                     <Link href={settings.phone} className="text-start">
                        <span className="text-xs text-gray-500 dark:text-gray-300">قم بذيارتنا</span>
                        <h5 className="text-sm">{settings.address}</h5>
                     </Link>
                  </div>
               </div>
            </div>
            </div>
         </div>
      </>
   )
}

const Section = ({ data }) => {
   if (data) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-8 my-12 md:my-20 text-center md:text-start">
            <h2 className="md:col-span-2">{data.title}</h2>
            <div className="md:col-span-6 flex flex-wrap lg:flex-nowrap">
               {data.items.map((item, i) => {
                  return (
                     <Item key={i} data={item} border={item.name === data.items[data.items.length - 1].name ? false : true} />
                  )
               })}
            </div>
         </div>
      )
   }
}

export default function Index() {
   const dispatch = useDispatch()
   useEffect(() => {
     dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
   }, [])
   const settings = useSelector(state => state.settings.value)
   const data = [
      {
         title: "الباقات",
         items: [
            {
               icon: faPlaneDeparture,
               name: "باقات السياحة الداخلية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faShip,
               name: "باقات الرحلات البحرية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faThList,
               name: "باقات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faTrophy,
               name: "الباقات الرياضية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faCampground,
               name: "المخيمات الصيفية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "المواصلات",
         items: [
            {
               icon: faCar,
               name: "خدمة تأجير السيارات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faMap,
               name: "التنقلات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faTrain,
               name: "تذاكر القطار",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "زيارة المعالم والأنشطة",
         items: [
            {
               icon: faCameraRetro,
               name: "أنشطة السياحة",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faGlobeAfrica,
               name: "أنشطة السياحة الدولية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "خدمات التأشيرات",
         items: [
            {
               icon: faPassport,
               name: "التأشيرة",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "خدمة الاستقبال والترحيب",
         items: [
            {
               icon: faCouch,
               name: "دخول صالة الاستراحة في المطار",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               icon: faUniversalAccess,
               name: "خدمة الاستقبال والترحيب لكبار الشخصيات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
   ]
   return (
      <>
         <Head>
            <title>المزيد من الخدمات</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings.meta_description}
            />
            <meta property="og:title" content="المزيد من الخدمات" />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content="المزيد من الخدمات" />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
         </Head>
         <div className='bg-gray-50 dark:bg-gray-900 dark:text-white'>
            <div className="hidden md:block top h-20 lg:h-36 bg-secondary w-full"></div>
            <div className='container p-0 sm:px-4 max-w-7xl'>
               <div className="border-b hidden lg:block dark:border-gray-700">
                  <Breadcrumbs list={[{ title: "المزيد من الخدمات" }]} />
               </div>
               <div className="py-16 md:py-20">
                  <h1 className='text-xl md:text-2xl mb-6 pr-4 md:pr-0'>المزيد من الخدمات</h1>
                  <Section />
                  {data.map((section, i) => {
                     return (
                        <Section key={i} data={section} />
                     )
                  })}
               </div>
            </div>
         </div>
      </>
   )
}
