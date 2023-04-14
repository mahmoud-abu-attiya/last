/* eslint-disable @next/next/no-img-element */
import React from "react";
import BtnArrow from "./BtnArrow";
import Image from "next/image";

const FlipCard = ({ img, title, description, logo, btnTitle, btnUrl }) => {
   return (
      <div className="flip-card rounded-3xl my-14 relative">
         <div className="flip-card-inner rounded-3xl">
            <div className="flip-card-front rounded-3xl overflow-hidden p-4 flex">
               <span className="absolute block top-0 left-0 w-full h-full bg-black/25" ><span className="sr-only">text</span></span>
               <div className="w-full h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image src={img} alt={title} width={540} height={350} />
               </div>
               <div className="flex w-full gap-8 justify-between items-center mt-auto">
                  <h3 className="title md:text-xl lg:text-2xl text-white font-bold mb-4">
                     {title}
                  </h3>
                  <span className="text-primary min-w-[3rem] w-12 h-12 border border-primary rounded-full flex justify-center items-center">
                     <i className="fal fa-arrow-right -rotate-45"><span className="sr-only">text</span></i>
                  </span>
               </div>
            </div>
            <div className="flip-card-back rounded-3xl overflow-hidden bg-white text-secondary p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 md:gap-6 items-start">
               {logo && (
                  <div className="logo">
                     <Image src={logo} alt={title} width={60} height={60} />
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
            </div>
         </div>
      </div>
   );
};

export default FlipCard;
