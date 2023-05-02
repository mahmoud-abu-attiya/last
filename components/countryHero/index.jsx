import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Index() {
   const data = [
      {
         image: "https://images.unsplash.com/photo-1605045544284-d13c6d6a60a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
         title: "اكتشف معنا أروع وجهات الاول",
         subTitle: "اكتشف معنا أروع وجهات الصب الاول"
      },
      {
         image: "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
         title: "اكتشف معنا أروع وجهات الثاني",
         subTitle: "اكتشف معنا أروع وجهات الصب الثاني"
      },
      {
         image: "https://images.unsplash.com/photo-1517057011470-8f36d636e6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
         title: "اكتشف معنا أروع وجهات الثالث",
         subTitle: "اكتشف معنا أروع وجهات الصب الثالث"
      },
      {
         image: "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
         title: "اكتشف معنا أروع وجهات الرابع",
         subTitle: "اكتشف معنا أروع وجهات الصب الرابع"
      },
      {
         image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
         title: "اكتشف معنا أروع وجهات الخامس",
         subTitle: "اكتشف معنا أروع وجهات الصب الخامس"
      },
      {
         image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
         title: "اكتشف معنا أروع وجهات السادس",
         subTitle: "اكتشف معنا أروع وجهات الصب السادس"
      },
   ]
   const [activeIndex, setActiveIndex] = useState(0)
   const next = () => {
      if (activeIndex !== data.length - 1) {
         setActiveIndex(activeIndex + 1)
      } else {
         setActiveIndex(0)
      }
   }
   useEffect(() => {
      const interval = setTimeout(() => {
         next()
      }, 5000)
      return () => clearTimeout(interval)
   }, [activeIndex])

   useEffect(() => {
      document.querySelectorAll(".heroimg").forEach((image, i) => {
         if (i === activeIndex) {
            image.style.zIndex = 1
            setTimeout(() => {
            image.classList.remove("unshow")
            image.classList.add("show")
            }, 100)
         } else {
            image.style.zIndex = -1
            setTimeout(() => {
            image.classList.remove("show")
            image.classList.add("unshow")
            }, 1500)
         }
      })
      document.querySelectorAll(".title").forEach((title, i) => {
         if (i === activeIndex) {
            setTimeout(() => {
               title.classList.remove("unshow")
               title.classList.add("show")
            }, 1000)
         } else {
            title.classList.add("unshow")
            title.classList.remove("show")
         }
      })
      document.querySelectorAll(".subtitle").forEach((title, i) => {
         if (i === activeIndex) {
            setTimeout(() => {
               title.classList.remove("unshow")
               title.classList.add("show")
            }, 1000)
         } else {
            title.classList.add("unshow")
            title.classList.remove("show")
         }
      })
   }, [activeIndex])

   return (
      <div className='h-screen w-full overflow-hidden relative'>
         <div className="absolute top-0 left-0 w-full h-screen bg-black/25 z-10"><span className='sr-only'>overlay</span></div>
         {data.map((slide, index) => {
            return (
               <div className={`transition duration-500 w-full h-full`} key={index}>
                  <Image src={slide.image} alt="hero" fill className={`object-cover heroimg transition-all duration-[1.5s]`} />
                  <div className="absolute top-0 left-0 flex flex-col justify-center px-4 md:px-20 items-start w-full h-full z-10 text-white">
                     <h2 className="out text-xl md:text-3xl transition-all duration-1000 title delay-300">{slide.title}</h2>
                     <h3 className="text-2xl md:text-3xl py-2 lg:text-4xl transition-all duration-1000 subtitle">{slide.subTitle}</h3>
                  </div>
               </div>
            )
         })}
          <Link href={"/our-programs"} className='rounded-full px-4 py-2 text-xs bg-white z-10 absolute bottom-4 block md:hidden right-4 bold'>عودة إلى الباقات</Link>
      </div>
   )
}
