import Breadcrumbs from '@/components/Breadcrumbs'
import Image from 'next/image'
import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'

const noto = localFont({ src: '../../public/fonts/NotoNaskhArabic-Regular.ttf' })

export default function Daleel() {
   const data = {
      id: 1,
      title: "الدليل السياحي",
      desc: 'اكتشف معنا أروع وجهات السفر',
      image: "https://backend.elnagahtravels.com/storage/countries/VDHSwd11Kov6I5ZqcAfrptFR5vrl6WPN0a0n6ldb.jpg"
   }
   const list = [
      {
         title: "الدليل السياحي",
         href: "/city-guides"
      },
      {
         title: data.title,
      }
   ]
   return (
      <>
         <div className="w-full bg-secondary h-36 md:h-40"></div>
         <div className="w-full h-[50vh] relative overflow-hidden flex">
            <Image src={data.image} alt="daleel" fill className='object-cover' />
            <div className="w-full relative z-10 bg-gradient-to-t from-black/75 to-transparent text-white py-4 mt-auto">
               <div className="container">
                  <h1 className="text-xl md:text-2xl">{data.title}</h1>
                  <p className="desc">{data.desc}</p>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="border-b">
            <Breadcrumbs list={list} />
            </div>
            <p className={`my-4 md:my-6 max-w-3xl text-justify ${noto.className}`}>تعد جزر المالديف الوجهة السياحية الأنسب لعشاق البحر والشمس، فهي جزيرة ساحرة تضم العديد من الشواطئ الخلابة ذات المياه الكريستالية. استمتع بالرياضات المائية في المياه الصافية، وشاهد الشعاب المرجانية، تناول ألذ المأكولات البحرية، واستمتع بالرفاهية في أروع منتجعات الجزيرة التي تضمن لك تجربة ولا أروع. سواء كنت ترغب في الاسترخاء على الشاطئ ومشاهدة غروب الشمس، أو تخطّط للاستمتاع بتجربة فريدة في أفضل المنتجعات العالمية فإن جزر المالديف بطابعها الخاص تمنحك الأجواء المناسبة لتمضي أروع الأوقات.</p>
            <div className="my-4 md:my-6">
               <h4 className=''>مستجدات السفر</h4>
               <p className={`my-4 max-w-3xl ${noto.className}`}>تعرّف على آخر مستجدات السفر، إجراءات السلامة وقيود الدخول إلى جزر المالديف. <Link className='text-blue-500 hover:underline' href={"#"}>عرض التفاصيل</Link></p>
               <mark className={`my-4 max-w-3xl text-ellipsis ${noto.className}`}> <strong>ملاحظة:</strong> <em>قد تكون بعض المعالم المذكورة مغلقة حالياً نظراً للقيود المفروضة على الحركة</em></mark>
            </div>
         </div>
      </>
   )
}
