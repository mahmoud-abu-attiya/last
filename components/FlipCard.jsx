/* eslint-disable @next/next/no-img-element */
import React from "react";
import BtnArrow from "./BtnArrow";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from './index.module.css'

const FlipCard = ({country, btnTitle, btnUrl }) => {
   const settings = useSelector((state) => state.settings.value);
   return (
      <div className="flip-card rounded-3xl my-14 relative">
         <div className="flip-card-inner rounded-3xl">
            <div className="flip-card-front rounded-3xl overflow-hidden p-4 flex">
                  <Image src={country.image} alt={country.country.name} fill className="object-cover" />
               <div className="flex w-full gap-8 justify-between items-center mt-auto">
                  <h3 className="title md:text-xl lg:text-2xl text-white font-bold mb-4">
                  {country.country.name}
                  </h3>
                  <span className="text-primary min-w-[3rem] w-12 h-12 border border-primary rounded-full flex justify-center items-center">
                     <Image src="/icons/arrow-left.svg" className="rotate-45" alt="arrow" width={20} height={20} />
                  </span>
               </div>
            </div>
            {/* <div className="flip-card-back rounded-3xl overflow-hidden bg-white text-secondary p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 md:gap-6 items-start">
               {settings.logo && (
                  <div className="logo">
                     <Image src={settings.logo} alt={title} width={70} height={70} />
                  </div>
               )}
               <h3 className="md:text-xl lg:text-2xl font-bold">{title}</h3>
               <p className="text-xs md:text-sm opacity-95 regular">
                  {description}
               </p>
               {btnTitle && (
                  <BtnArrow
                     title={btnTitle}
                     classes="self-end mt-auto text-primary mx-unset"
                     href={btnUrl}
                  />
               )}
            </div> */}
                    <div className={styles.card__back}>
          <div className={styles.card__back__content}>
            {settings?.logo && (
              <Image
                src={settings?.logo}
                alt={`programs logo ${country.name}`}
                width={102}
                height={70}
              />
            )}
            <h3 className={styles.card__back__title}>
              {country.country.name} 
              {/* <BsArrowLeft /> */}
            </h3>
            <p>
                {/* <BsFillCircleFill /> */}
                {country.category.name}
            </p>
            <p>
              <span>
                {/* <BsFillCircleFill /> */}
                سعر البرنامج
              </span>
              <span> {country.price_after_discount}</span> ريال سعودي
            </p>
            <p
              style={{
                display: 'flex',
                justifyContent: ' flex-start',
                alignItems: 'center',
              }}
            >
              <span>
                {/* <BsFillCircleFill /> */}
                بدلا من
              </span>
              <span style={{ textDecoration: 'line-through' }}>
                {country.price}
              </span>
            </p>
            <p className={styles.offer}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                <path d='m30.718 13.042.002-9.522a2.243 2.243 0 0 0-2.24-2.24l-9.52.002-.402-.002c-.83 0-1.62.048-2.19.618L1.822 16.442a1.83 1.83 0 0 0-.542 1.308c0 .495.192.96.542 1.308l11.12 11.12c.348.35.813.542 1.308.542.492 0 .96-.192 1.308-.542l14.544-14.546c.626-.622.62-1.52.618-2.384l-.002-.206zM24.96 8.96a1.92 1.92 0 1 1 .001-3.841 1.92 1.92 0 0 1-.001 3.841z'></path>
              </svg>
              وفر:
              <span>{country.price - country.price_after_discount}</span>
              ريال سعودي
            </p>
            <BtnArrow
                     title={btnTitle}
                     classes="self-end mt-auto text-primary mx-unset"
                     href={btnUrl}
                  />
          </div>
        </div>
         </div>
      </div>
   );
};

export default FlipCard;
