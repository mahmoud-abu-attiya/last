import Head from "next/head"
import { useSelector, useDispatch } from "react-redux"
import Breadcrumbs from "@/components/Breadcrumbs"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faLocationDot, faTimes } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { setBacktoData } from "@/slices/backto"

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
            className={`${border ? "border-l" : "border-none"} dark:border-gray-700 group my-12 md:my-0 px-4 flex flex-col items-center w-40 justify-center cursor-pointer gap-4`}>
            <Image src={data.img} alt={data.name} width={48} height={48} className="group-hover:-translate-y-2 group-hover:drop-shadow-md transition duration-300" />
            <h3 className="text-xs text-gray-500 dark:text-gray-300 font-light">{data.name}</h3>
         </div>
         <div style={{ zIndex: "70" }} className={`${open ? "block" : "hidden"} fixed top-0 w-full h-full left-0 flex items-center justify-center`}>
            <div className="w-full absolute top-0 left-0 h-full bg-black/50 backdrop-blur" onClick={() => setOpen(false)}></div>
            <div className="relative">
               <div className="absolute top-0 left-0 cursor-pointer rounded-t text-white translate-x-1/2 -translate-y-full bg-primary flex gap-4 px-4 py-2 text-xs" onClick={() => setOpen(false)}>
                  اغلاق
                  <FontAwesomeIcon icon={faTimes}/>
               </div>
            <div className="bg-white dark:bg-gray-900 mx-auto rounded-b-lg border-t-4 shadow-lg border-primary w-[90%] max-w-md max-h-[90%] overflow-auto">
               <div className="grid grid-cols-1 md:grid-cols-6 p-4 items-center gap-4 border-b-4 border-gray-300 dark:border-gray-700">
                  <div className="flex text-center items-center flex-col gap-4 md:col-span-2">
                     <Image src={data.img} alt={data.name} width={58} height={58} />
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
            <div className="md:col-span-6 flex flex-wrap md:flex-nowrap">
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
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Fholidays.svg&w=48&q=75',
               name: "باقات السياحة الداخلية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'http://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/cruises.svg',
               name: "باقات الرحلات البحرية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Fint-packages.svg&w=48&q=75',
               name: "باقات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Fsports.svg&w=48&q=75',
               name: "الباقات الرياضية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Fsummer_0.svg&w=48&q=75',
               name: "المخيمات الصيفية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "المواصلات",
         items: [
            {
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Frental_1.svg&w=48&q=75',
               name: "خدمة تأجير السيارات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/transfers_1.svg',
               name: "التنقلات",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/train_1.svg',
               name: "تذاكر القطار",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "زيارة المعالم والأنشطة",
         items: [
            {
               img: 'https://www.almosafer.com/_next/image?url=http%3A%2F%2Fcms-cdn.almosafer.com%2Fdrupal_cms%2Falm%2Ffiles%2Fpublic%2F2020-09%2Fdomestic-activities.svg&w=48&q=75',
               name: "أنشطة السياحة",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/international-activities.svg',
               name: "أنشطة السياحة الدولية",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "خدمات التأشيرات",
         items: [
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/visa.svg',
               name: "التأشيرة",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
         ]
      },
      {
         title: "خدمة الاستقبال والترحيب",
         items: [
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/airport-lounge.svg',
               name: "دخول صالة الاستراحة في المطار",
               desc: "هل ترغب بالذهاب في رحلة بحرية شيّقة حول العالم؟ سواءً كنت ترغب بتجربة في غاية الفخامة أو بتكلفة معقولة، صممنا لك باقات متعددة بمرافق عالمية المستوى، بالإضافة إلى وسائل الترفية وقائمة واسعة من الأطباق الشهية، كل هذا لتحظى بعطلة رائعة تبقى في الذاكرة. بإمكانك الاستمتاع بالكثير من النشاطات"
            },
            {
               img: 'https://cms-cdn.almosafer.com/drupal_cms/alm/files/public/2020-09/meet-greet_1.svg',
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
            <div className="top h-20 lg:h-36 bg-secondary w-full"></div>
            <div className='container max-w-7xl'>
               <div className="border-b hidden lg:block dark:border-gray-700">
                  <Breadcrumbs list={[{ title: "المزيد من الخدمات" }]} />
               </div>
               <div className="py-16 md:py-20">
                  <h1 className='text-xl md:text-2xl mb-6'>المزيد من الخدمات</h1>
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
