/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { faArrowLeft, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import BtnArrow from "@/components/BtnArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AsNavFor = () => {
   const [nav1, setNav1] = useState(null);
   const [nav2, setNav2] = useState(null);

   const slider1 = useRef();
   const slider2 = useRef();

   const data = [
      {
         id: 1,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
      {
         id: 2,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
      {
         id: 3,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
      {
         id: 4,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
      {
         id: 5,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
      {
         id: 6,
         items: [
            {
               id: 1,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 2,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 3,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
            {
               id: 4,
               date: "2021-05-01",
               img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
               title: "تأسيس الشركة",
               desc: "تأسيس الشركة تأسيس الشركة تأسيس الشركة تأسيس الشركة",
            },
         ],
      },
   ];

   useEffect(() => {
      setNav1(slider1.current);
      setNav2(slider2.current);
   }, [slider1, slider2]);

   return (
      <div>
         <Slider
            asNavFor={nav2}
            ref={slider1}
            arrows={false}
            rtl={true}
            className="my-8"
         >
            <div className="border-dashed border-t-8 w-screen border-primary absolute top-1/2 left-0 -translate-y-1/2"></div>
            {data.map((item) => {
               return (
                  <div key={item.id} className="px-14 py-4">
                     <div className="flex gap-10">
                        {item.items.map((item) => {
                           return (
                              <div
                                 key={item.id}
                                 className="flex flex-col gap-4"
                              >
                                 <span className="text-primary">
                                    {item.date}
                                 </span>
                                 <div className="relative pt-[100%] z-10">
                                    <Image
                                       src={item.img}
                                       alt={item.title}
                                       fill
                                       className="rounded-lg object-cover"
                                    />
                                 </div>
                                 <h3 className="text-2xl">{item.title}</h3>
                                 <p>{item.desc}</p>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               );
            })}
         </Slider>
         <div className="container max-w-3xl">
            <div className="border dark:border-gray-800 rounded-full px-14 py-4">
               <Slider
                  asNavFor={nav1}
                  ref={slider2}
                  slidesToShow={6}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  arrows={false}
                  className="dark:text-white"
               >
                  {data.map((item) => {
                     return (
                        <div
                           key={item.id}
                           className="px-3 py-2 rounded-md border dark:border-gray-800 text-center cursor-pointer"
                        >
                           <h3>{item.id}</h3>
                        </div>
                     );
                  })}
               </Slider>
            </div>
         </div>
      </div>
   );
};

export default function About({ about, slides }) {
   const settings = useSelector((state) => state.settings.value);
   const { images = [], achievements = [], steps = [] } = about;
   const [scrolltrans, setScrolltrans] = useState(0);
   useEffect(() => {
      window.addEventListener("scroll", () => {
         setScrolltrans(window.scrollY);
      });
      return () => {
         window.removeEventListener("scroll", () => {
            setScrolltrans(window.scrollY);
         });
      };
   }, []);
   const imgWidth = (index) => {
      if (index === 0) return 60;
      if (index === 3) return 55;
      if (index === 1) return 45;
      if (index === 2) return 30;
      if (index === 4) return 35;
   };
   const imgTop = (index) => {
      if (index === 0) return "20%";
      if (index === 3) return "30%";
      if (index === 1) return "70%";
      if (index === 2) return "10%";
      if (index === 4) return "85%";
   };
   const imgLeft = (index) => {
      if (index === 0) return "40%";
      if (index === 3) return "10%";
      if (index === 1) return "-10%";
      if (index === 2) return "-10%";
      if (index === 4) return "40%";
   };
   const imgTransform = (index) => {
      if (index === 0) return scrolltrans / 3;
      if (index === 3) return scrolltrans / 8;
      if (index === 1) return scrolltrans / 12;
      if (index === 2) return scrolltrans / 5;
      if (index === 4) return scrolltrans / 2;
   };
   return (
      <>
         <Head>
            <title>{slides[0].title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta property="og:title" content={slides[0].title} />
            <meta
               property="og:url"
               content="https://last-delta.vercel.app/about-us"
            />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta name="twitter:title" content={slides[0].title} />
            <meta
               name="twitter:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
         </Head>
         <section className="h-[110vh] overflow-hidden bg-gradient-to-b from-secondary to-white dark:to-gray-950">
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center h-full text-white">
               <div className="flex flex-col gap-10">
                  <div className="info flex gap-4">
                     <div className="py-1 px-3 border bg-secondary dark:bg-gray-800 border-secondary/50 rounded-md text-xs">
                        <span className="text-primary">30 </span> رحلة
                     </div>
                     <div className="py-1 px-3 border bg-secondary dark:bg-gray-800 border-secondary/50 rounded-md text-xs">
                        اكثر<span className="text-primary"> 20 </span> مكان
                     </div>
                  </div>
                  <h1 className="text-5xl max-w-lg leading-[4rem] drop-shadow-md">
                     غير طريقة تجربة الملايين للعالم
                  </h1>
                  <p className="max-w-md">
                     في وسام النجاح ، نبني بمهمة ربط الملايين من المسافرين بما
                     لا ينسى الخبرات حول العالم. الانضمام إلينا في رحلة.
                  </p>
                  <Link
                     href="/contact-us"
                     className="bg-primary w-fit py-4 px-6 rounded-full flex items-center gap-4"
                  >
                     تواصل معنا
                     <FontAwesomeIcon icon={faArrowLeft} />
                  </Link>
               </div>
               <div className="relative w-full h-full">
                  {images.slice(0, 5).map((image, index) => {
                     return (
                        <div
                           className="absolute shadow-xl rounded-lg overflow-hidden transition ease-in-out duration-500"
                           key={index}
                           style={{
                              width: `${imgWidth(index)}%`,
                              height: `${imgWidth(index) * 5}px`,
                              top: imgTop(index),
                              left: imgLeft(index),
                              transform: `translateY(-${imgTransform(
                                 index
                              )}px)`,
                           }}
                        >
                           <Image
                              src={image.image}
                              fill
                              quality={50}
                              className="object-cover"
                              alt="about us"
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>
         <section className="py-20 md:py-44">
            <div className="container grid gap-10 grid-cols-1 md:grid-cols-2 dark:text-white">
               <div className="imgs grid grid-cols-2 gap-4 md:gap-8">
                  <div className="relative pt-[177.777777778%] h-0 shadow-lg rounded-xl overflow-hidden translate-y-6 md:translate-y-16">
                     <Image
                        src={images[6].image}
                        fill
                        quality={50}
                        className="object-cover"
                        alt="about us"
                     />
                  </div>
                  <div className="relative pt-[177.777777778%] h-0 shadow-lg rounded-xl overflow-hidden -translate-y-6 md:-translate-y-16">
                     <Image
                        src={images[7].image}
                        fill
                        quality={50}
                        className="object-cover"
                        alt="about us"
                     />
                  </div>
               </div>
               <div className="info">
                  <h1 className="text-4xl md:text-5xl max-w-lg mb-10 drop-shadow-md">
                     نحن السوق العالمية الرائدة لتجارب سفر لا تُنسى
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300 max-w-lg mb-10">
                     لم يعد الأمر يتعلق بكيفية وصولنا إلى هناك أو أين ننام ،
                     ولكن حول ما نقوم به. لكن العثور على أشياء لا تصدق للقيام
                     بها ليس دائما سهلا.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 max-w-lg">
                     في الوقت الحالي ، سوق الخبرات المحلية هو 80٪ خارج الإنترنت
                     ومجزأة بشكل كبير. في وسام النجاح ، نحن نتغير الذي - التي.
                  </p>
               </div>
            </div>
         </section>
         <section className="py-20 md:py-36">
            <div className="container">
               <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-xl overflow-hidden shadow-xl mx-auto">
                  <div className="relative h-[20rem] md:h-full p-6 md:p-10 flex">
                     <Image
                        src={images[8].image}
                        alt="about us"
                        fill
                        className="object-cover"
                     />
                     <div className="flex w-full justify-between bg-white dark:bg-gray-950 dark:text-white shadow-lg relative px-6 md:px-10 py-4 text-xs md:text-base md:py-6 mt-auto rounded-xl items-center gap-8">
                        <p>التفكير في رحلتنا: استرجاع وسام النجاح 2022</p>
                        <button className="rounded-full text-white bg-secondary dark:bg-gray-700 p-6 relative">
                           <FontAwesomeIcon
                              icon={faPlay}
                              className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                           />
                        </button>
                     </div>
                  </div>
                  <div className="info p-6 md:p-10 md:py-20 flex flex-col gap-6">
                     <h1 className="text-4xl md:text-5xl">
                        المشاكل التي نحلها
                     </h1>
                     <p className="">
                        الطريقة التي نسافر بها قد تغيرت. لم يعد الأمر يتعلق
                        بكيفية وصولنا إلى هناك أو أين ننام ، بل يتعلق بالتجارب
                        التي نمر بها.
                     </p>
                     <p className="">
                        إن العثور على تلك الأشياء المذهلة التي يمكنك القيام بها
                        ليس بالأمر السهل دائمًا ، مع وجود 80٪ من التجارب في
                        السوق غير متصلة بالإنترنت ومجزأة إلى حد كبير. في وسام
                        النجاح ، نقوم بتغيير ذلك.
                     </p>
                  </div>
               </div>
            </div>
         </section>
         <section className="py-20 md:py-36 overflow-hidden dark:text-white">
            <div className="container grid grid-cols-1 md:grid-cols-5 gap-16">
               <div className="md:col-span-2 flex flex-col gap-8 max-w-md">
                  <h1 className="text-4xl md:text-5xl">فرصتنا الكبيرة</h1>
                  <p>
                     مع المزيد من الأشخاص الذين يستكشفون العالم ، والرقمنة
                     السريعة ، والرغبة المتزايدة في تجارب لا تُنسى ، نحن في وضع
                     فريد للاستفادة من هذا النمو. وبينما يعد سوق التجارب بحد
                     ذاته ضخمًا ، فإن فرصتنا تتجاوز السفر.
                  </p>
                  <strong>
                     نحن نبني لما هو قادم ونقود المجموعة بالفعل. الآن ، نريدك في
                     الرحلة.
                  </strong>
                  <BtnArrow title="اكتشف عروضنا" href="/our-programs" />
               </div>
               <div className="md:col-span-3 relative flex gap-4 md:gap-0">
                  <div className="relative h-fit rounded-xl overflow-hidden w-[30rem] pt-[75%]">
                     <Image
                        src={images[4].image}
                        alt="about us"
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="relative h-fit rounded-xl overflow-hidden w-[25rem] pt-[60%] md:-translate-x-20 -translate-y-20">
                     <Image
                        src={images[3].image}
                        alt="about us"
                        fill
                        className="object-cover"
                     />
                  </div>
               </div>
            </div>
         </section>
         <section className="py-20 md:py-36 dark:text-white" dir="ltr">
            <div className="container">
               <div className="head max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl mb-8">
                     إطلاق ما لا يُنسى منذ عام 2009
                  </h2>
                  <p>
                     من بدايات متواضعة في غرفة طلاب صغيرة إلى أن تصبح رائدًا في
                     هذا المجال ، تغير الكثير في وسام النجاح. ما لم يكن كذلك هو
                     شغفنا لإطلاق تجارب لا تُنسى للناس في جميع أنحاء العالم.
                  </p>
               </div>
            </div>
            <AsNavFor />
         </section>
         <section className="relative md:min-h-[300vh] bg-primary pt-16 md:pt-0">
            <div className="md:absolute top-1/2 right-1/2 md:w-1/2 max-w-xs md:max-w-lg mx-auto">
               <div className="grid grid-cols-4 gap-x-4 gap-y-10">
                  {/* /////////////// */}
                  <div></div>
                  <div className="relative translate-y-8">
                     <svg fill="none" viewBox="0 0 69 55">
                        <path
                           stroke="#07162d"
                           stroke-dasharray="8 4"
                           stroke-linejoin="bevel"
                           stroke-width="6"
                           d="M65.85 53.815C60.24 37.019 54.728 2.149.708 3.146"
                        ></path>
                     </svg>
                  </div>
                  <div className="col-span-2 flex flex-col items-center justify-center shadow-xl gap-2 px-8 py-4 rounded-lg bg-white dark:text-white dark:bg-gray-800">
                     <h4 className="text-primary text-xl">50</h4>
                     <span className="text-xs">مكاتب محلية</span>
                  </div>
                  {/* /////////////// */}
                  <div className="col-span-2 flex flex-col items-center justify-center shadow-xl gap-2 px-8 py-4 rounded-lg bg-white dark:text-white dark:bg-gray-800">
                     <h4 className="text-primary text-xl">50</h4>
                     <span className="text-xs">مكاتب محلية</span>
                  </div>
                  <div className="relative translate-y-8">
                     <svg fill="none" viewBox="0 0 55 71">
                        <path
                           stroke="#07162d"
                           stroke-linecap="square"
                           stroke-width="6"
                           d="M3.608 67.087c.266-11.696 3.38-32.073 35.887-34.29 9.925 1.234 16.175 11.046 8.929 15.532-7.247 4.486-17.168-12.339-17.019-21.054.15-8.716 1.637-19.884 19.233-23.327"
                        ></path>
                     </svg>
                  </div>
                  <div></div>
                  {/* /////////////// */}
                  <div></div>
                  <div className="relative translate-y-8">
                     <svg fill="none" viewBox="0 0 53 51">
                        <path
                           stroke="#07162d"
                           stroke-dasharray=".05 10"
                           stroke-linecap="round"
                           stroke-linejoin="bevel"
                           stroke-width="6"
                           d="M3.806 3.099C17.038 1.5 44.787 8.23 49.924 47.922"
                        ></path>
                     </svg>
                  </div>
                  <div className="col-span-2 flex flex-col items-center justify-center shadow-xl gap-2 px-8 py-4 rounded-lg bg-white dark:text-white dark:bg-gray-800">
                     <h4 className="text-primary text-xl">50</h4>
                     <span className="text-xs">مكاتب محلية</span>
                  </div>
                  {/* /////////////// */}
                  <div className="col-span-2 flex flex-col items-center gap-2 px-8 py-4 rounded-lg bg-white dark:text-white dark:bg-gray-800">
                     <h4 className="text-primary text-xl">50</h4>
                     <span className="text-xs">مكاتب محلية</span>
                  </div>
                  <div className="relative translate-y-8"> </div>
                  <div></div>
                  {/* /////////////// */}
               </div>
            </div>
            <div className="md:sticky md:h-screen py-20 md:py-0 top-0 flex items-center">
               {/* <div className="absolute w-1/2 top-0 left-0 bg-green-400 h-full"></div> */}
               <div
                  className="absolute top-0 left-0 w-full md:h-screen"
                  style={{
                     backgroundImage:
                        "linear-gradient(#59b5ba, rgba(255,255,255,0), rgba(255,255,255,0), #59b5ba)",
                  }}
               ></div>
               <div className="container">
                  <div className="grid grid-cols-1 md:grid-cols-5">
                     <div className="md:col-span-2 flex flex-col gap-8 relative z-20">
                        <h3 className="text-4xl">عقدنا المحدد</h3>
                        <p>
                           الكثير من العمل الذي نقوم به اليوم هو تحديد فئة
                           الخبرات العالمية. ولكن هناك الكثير لتفتحه في هذه
                           الرحلة. هناك المزيد لإنشائه والمزيد لإلغاء قفله
                           والمزيد.
                        </p>
                        <p>
                           لقد استخدمنا تحديات الوباء لتقوية علاقاتنا وثقافتنا ،
                           وبينما بدأ العقد الماضي نمونا ، نعتقد أن هذا سيحدده.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="py-20 md:py-36 bg-gray-50 dark:text-white dark:bg-gray-800">
            <div className="container max-w-5xl">
               <h2 className="text-3xl max-w-sm">
                  3 أسباب تدفعك للانضمام إلينا في الرحلة
               </h2>
               <div className="flex flex-col gap-8 py-10">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full p-8 md:p-12 mx-auto bg-white dark:bg-gray-950 rounded-2xl">
                     <div className="md:col-span-3 flex flex-col gap-8">
                        <div className="flex items-center gap-8">
                           <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              1
                           </span>
                           اعمل مع الأفضل
                        </div>
                        <h5 className="text-xl">
                           ابذل قصارى جهدك ، مع أفضل ما لديك
                        </h5>
                        <p>
                           في وسام النجاح ، ستعمل مع زملاء من أكثر من 75 جنسية
                           ومسارات وظيفية متنوعة ؛ الأشخاص الذين كانوا مؤسسين
                           ومهندسين وكتاب وفنانين وغير ذلك.
                        </p>
                        <p>
                           ليس لدينا دائمًا نفس الخلفية ، ولكن هناك شيء واحد
                           نقدره بشكل جماعي: حب التجارب.
                        </p>
                     </div>
                     <div className="md:col-span-2 relative pt-[100%]">
                        <Image
                           src={images[1].image}
                           alt="hi"
                           fill
                           className="rounded-xl object-cover"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full p-8 md:p-12 mx-auto bg-white dark:bg-gray-950 rounded-2xl">
                     <div className="md:col-span-3 flex flex-col gap-8">
                        <div className="flex items-center gap-8">
                           <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              2
                           </span>
                           اعمل مع الأفضل
                        </div>
                        <h5 className="text-xl">
                           ابذل قصارى جهدك ، مع أفضل ما لديك
                        </h5>
                        <p>
                           في وسام النجاح ، ستعمل مع زملاء من أكثر من 75 جنسية
                           ومسارات وظيفية متنوعة ؛ الأشخاص الذين كانوا مؤسسين
                           ومهندسين وكتاب وفنانين وغير ذلك.
                        </p>
                        <p>
                           ليس لدينا دائمًا نفس الخلفية ، ولكن هناك شيء واحد
                           نقدره بشكل جماعي: حب التجارب.
                        </p>
                     </div>
                     <div className="md:col-span-2 relative pt-[100%]">
                        <Image
                           src={images[0].image}
                           alt="hi"
                           fill
                           className="rounded-xl object-cover"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full p-8 md:p-12 mx-auto bg-white dark:bg-gray-950 rounded-2xl">
                     <div className="md:col-span-3 flex flex-col gap-8">
                        <div className="flex items-center gap-8">
                           <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                              3
                           </span>
                           اعمل مع الأفضل
                        </div>
                        <h5 className="text-xl">
                           ابذل قصارى جهدك ، مع أفضل ما لديك
                        </h5>
                        <p>
                           في وسام النجاح ، ستعمل مع زملاء من أكثر من 75 جنسية
                           ومسارات وظيفية متنوعة ؛ الأشخاص الذين كانوا مؤسسين
                           ومهندسين وكتاب وفنانين وغير ذلك.
                        </p>
                        <p>
                           ليس لدينا دائمًا نفس الخلفية ، ولكن هناك شيء واحد
                           نقدره بشكل جماعي: حب التجارب.
                        </p>
                     </div>
                     <div className="md:col-span-2 relative pt-[100%]">
                        <Image
                           src={images[2].image}
                           alt="hi"
                           fill
                           className="rounded-xl object-cover"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="py-20 md:py-28 dark:text-white">
            <div className="container text-center max-w-2xl">
               <h6 className="text-xl mb-8">مميزات الحجز عن طريق موقع المطار</h6>
               <div className="flex gap-8">
                  <div className="flex flex-col gap-4 items-center">
                     <Image
                        src={"/images/debit-card.svg"}
                        alt="hi"
                        width={100}
                        height={100}
                     />
                     <p>وسائل دفع آمنة و مضمونة</p>
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                     <Image
                        src={"/images/point-of-service.svg"}
                        alt="hi"
                        width={100}
                        height={100}
                     />
                     <p>اسعارنا شاملة الخدمة و الضريبة</p>
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                     <Image
                        src={"/images/hotelsCount.svg"}
                        alt="hi"
                        width={100}
                        height={100}
                     />
                     <p>أكثر من مليون فندق حول العالم</p>
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                     <Image
                        src={"/images/airlineCount.svg"}
                        alt="hi"
                        width={100}
                        height={100}
                     />
                     <p>أكثر من 500 شركة طيران</p>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export async function getServerSideProps() {
   const [aboutRes, slideRes] = await Promise.all([
      fetch("https://backend.elnagahtravels.com/public/api/about"),
      fetch("https://backend.elnagahtravels.com/public/api/slides?page=about"),
   ]);
   const [
      data,
      {
         data: { slide = [] },
      },
   ] = await Promise.all([aboutRes.json(), slideRes.json()]);
   return {
      props: {
         about: data,
         slides: slide,
      },
   };
}
