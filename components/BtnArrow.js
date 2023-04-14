import React from "react";
import Link from "next/link";

const BtnArrow = (props) => {
   return (
      <Link
         href={props.href}
         className={`group flex lg:mx-0 text-sm hover:text-white transition-all duration-[.45s] relative hover:px-6 pr-5 md:pr-6 h-12 md:h-14 items-center w-fit btnarrow whitespace-nowrap ${
            props.classes && props.classes
         }`}
      >
         <div className="z-20 text-xs lg:text-base flex group-hover:gap-6 gap-8 md:gap-10 relative items-center transition-all ease-linear duration-300">
            {props.title}
            <i className="fal fa-arrow-right text-primary group-hover:text-white"></i>
         </div>
         <span className="rounded-full right-0 group-hover:bg-primary group-hover:max-w-full transition-all ease-linear duration-300 z-10 absolute max-w-[3rem] md:max-w-[3.5rem] w-full h-12 md:h-14 flex justify-center items-center text-primary border border-primary"></span>
      </Link>
   );
};

export default BtnArrow;
