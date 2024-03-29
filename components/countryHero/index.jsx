// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";

// const getWeather = async (city) => {
//    const res = await fetch(
//       `https://api.weatherapi.com/v1/current.json?key=0e9415515df24a47a78152654232307&q=${city}`
//    );
//    const data = await res.json();
//    return data;
// };

// export default function Index({ counrty, en }) {
//    const [weather, setWeather] = useState(null);

//    useEffect(() => {
//       getWeather(counrty).then((res) => {
//          setWeather(res);
//          console.log(res);
//       });
//       // console.log(weather);
//    }, []);
//    const data = [
//       {
//          image: "https://images.unsplash.com/photo-1605045544284-d13c6d6a60a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//          title: "اكتشف معنا أروع وجهات الاول",
//          subTitle: "اكتشف معنا أروع وجهات الصب الاول",
//       },
//       {
//          image: "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
//          title: "اكتشف معنا أروع وجهات الثاني",
//          subTitle: "اكتشف معنا أروع وجهات الصب الثاني",
//       },
//       {
//          image: "https://images.unsplash.com/photo-1517057011470-8f36d636e6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//          title: "اكتشف معنا أروع وجهات الثالث",
//          subTitle: "اكتشف معنا أروع وجهات الصب الثالث",
//       },
//       {
//          image: "https://images.unsplash.com/flagged/photo-1552035791-b3cc1632e933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
//          title: "اكتشف معنا أروع وجهات الرابع",
//          subTitle: "اكتشف معنا أروع وجهات الصب الرابع",
//       },
//       {
//          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
//          title: "اكتشف معنا أروع وجهات الخامس",
//          subTitle: "اكتشف معنا أروع وجهات الصب الخامس",
//       },
//       {
//          image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//          title: "اكتشف معنا أروع وجهات السادس",
//          subTitle: "اكتشف معنا أروع وجهات الصب السادس",
//       },
//    ];
//    const [activeIndex, setActiveIndex] = useState(0);
//    const next = () => {
//       if (activeIndex !== data.length - 1) {
//          setActiveIndex(activeIndex + 1);
//       } else {
//          setActiveIndex(0);
//       }
//    };
//    useEffect(() => {
//       const interval = setTimeout(() => {
//          next();
//       }, 5000);
//       return () => clearTimeout(interval);
//    }, [activeIndex]);

//    useEffect(() => {
//       document.querySelectorAll(".heroimg").forEach((image, i) => {
//          if (i === activeIndex) {
//             image.style.zIndex = 1;
//             setTimeout(() => {
//                image.classList.remove("unshow");
//                image.classList.add("show");
//             }, 100);
//          } else {
//             image.style.zIndex = -1;
//             setTimeout(() => {
//                image.classList.remove("show");
//                image.classList.add("unshow");
//             }, 1500);
//          }
//       });
//       document.querySelectorAll(".title").forEach((title, i) => {
//          if (i === activeIndex) {
//             setTimeout(() => {
//                title.classList.remove("unshow");
//                title.classList.add("show");
//             }, 1000);
//          } else {
//             title.classList.add("unshow");
//             title.classList.remove("show");
//          }
//       });
//       document.querySelectorAll(".subtitle").forEach((title, i) => {
//          if (i === activeIndex) {
//             setTimeout(() => {
//                title.classList.remove("unshow");
//                title.classList.add("show");
//             }, 1000);
//          } else {
//             title.classList.add("unshow");
//             title.classList.remove("show");
//          }
//       });
//    }, [activeIndex]);

//    return (
//       <div className="h-[50vh] md:h-screen w-full overflow-hidden relative">
//          {weather && (
//             <div
//                className={`flex dark:text-white absolute bottom-20 rounded-lg border dark:border-gray-700 ${
//                   en ? "left-8 md:left-20" : "right-4 md:right-20"
//                } bg-gray-100 dark:bg-gray-800 z-20`}
//             >
//                <Image
//                   src={"https:" + weather.current.condition.icon}
//                   alt="weather icon"
//                   width={70}
//                   height={70}
//                   className="object-cover"
//                />
//                <div className="p-4 flex flex-col">
//                   <div className="flex gap-4 pb-2 mb-2 border-b dark:border-gray-700">
//                      <span className="text-xs flex gap-2">
//                         <FontAwesomeIcon icon={faCalendar} />
//                         {weather.location.localtime.slice(0, 10)}
//                      </span>
//                      <span className="text-xs flex gap-2">
//                         <FontAwesomeIcon icon={faClock} />
//                         {weather.location.localtime.slice(11)}
//                      </span>
//                   </div>
//                   <h3 className="text-3xl bold">{weather.current.temp_c}c</h3>
//                </div>
//             </div>
//          )}
//          <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-10">
//             <span className="sr-only">overlay</span>
//          </div>
//          {data.map((slide, index) => {
//             return (
//                <div
//                   className={`transition duration-500 w-full h-full`}
//                   key={index}
//                >
//                   <Image
//                      src={slide.image}
//                      alt="hero"
//                      fill
//                      priority
//                      className={`object-cover heroimg transition-all duration-[1.5s]`}
//                   />
//                   <div className="absolute top-0 left-0 flex flex-col justify-center px-4 md:px-20 items-start w-full h-full z-10 text-white">
//                      <h2 className="out text-xl md:text-3xl transition-all duration-1000 title delay-300">
//                         {slide.title}
//                      </h2>
//                      <h3 className="text-2xl md:text-3xl py-2 lg:text-4xl transition-all duration-1000 subtitle">
//                         {slide.subTitle}
//                      </h3>
//                   </div>
//                </div>
//             );
//          })}
//          <Link
//             href={"/our-programs"}
//             className="rounded-full px-4 py-2 text-xs bg-white dark:bg-gray-900 dark:text-gray-50 z-10 absolute bottom-4 block md:hidden right-4 bold"
//          >
//             عودة إلى الباقات
//          </Link>
//       </div>
//    );
// }

import { EffectCards, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import { useState } from "react";

export default function Index() {
   const data = [
      {
         title: "اكتشف معنا أروع وجهات 852الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689062026652-9d67e3b907cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات 2الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689038014085-2a4ca6ad01c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات 5الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689530730088-074b05f7c268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات 57الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689198162951-c76dd51ec46e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات877 الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689062026795-ba95cfa47cca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات58 الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1688821572042-266b4c60b783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات 453434الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1689169890648-5ed63ccc0a53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
      {
         title: "اكتشف معنا أروع وجهات85 الاول",
         subTitle:
            "اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاول اكتشف معنا أروع وجهات الصب الاولاكتشف معنا أروع وجهات الصب الاول",
         image: "https://images.unsplash.com/photo-1688821571886-39db2ab27d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      },
   ];
   const [active, setActive] = useState(data[0]);
   return (
      <div className="h-screen w-full overflow-hidden relative flex items-center justify-center">
         <Image
            src={active.image}
            alt="hero"
            fill
            priority
            className={`object-cover -z-10`}
         />
         <div className="absolute top-0 left-0 bg-black/50 backdrop-blur-sm w-full h-full"></div>
         <div className="container grid grid-cols-1 md:grid-cols-2 relative">
            <div className="relative text-white min-h-[15rem]">
               {data.map((slide, index) => {
                  return (
                     <div className="absolute top-1/2 -translate-y-1/2" key={index}>
                        <div
                        
                        className={`transition duration-500 ${
                           active.title === slide.title
                              ? "opacity-100 translate-y-0"
                              : "translate-y-40 opacity-0"
                        }`}
                     >
                        <h3 className="text-3xl mb-4">{slide.title}</h3>
                        <p>{slide.subTitle}</p>
                     </div>
                     </div>
                  );
               })}
            </div>
            <div dir="ltr">
               <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  className="mySwiper cards"
                  onSlideChange={(swiper) =>
                     setActive(data[swiper.activeIndex])
                  }
                  autoplay={{
                     delay: 2500,
                     disableOnInteraction: false,
                   }}
               >
                  {data.map((item, i) => {
                     return (
                        <SwiperSlide key={i}>
                           <Image
                              src={item.image}
                              alt="image"
                              fill
                              className="object-cover"
                           />
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
            </div>
         </div>
      </div>
   );
}
