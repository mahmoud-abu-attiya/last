import React from "react";
import Link from "next/link";
import Image from "next/image";

const BtnArrow = (props) => {
   return (
      <Link
         href={props.href}
         className={`group flex lg:mx-0 text-sm hover:text-white transition-all duration-[.45s] relative hover:px-6 pl-4 h-12 items-center w-fit btnarrow whitespace-nowrap ${
            props.classes && props.classes
         }`}
      >
         <div className="z-20 text-xs lg:text-base flex group-hover:gap-4 gap-8 relative items-center transition-all ease-linear duration-200">
            <span className="duration-100">{props.title}</span>
            {/* <i className="fal fa-arrow-right text-primary group-hover:text-white"></i> */}
            {/* <Image src="/icons/arrow-left.svg" alt="arrow" width={18} height={18} /> */}
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="animatedBtn_btn__svg__El9n8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path></svg>
         </div>
         <span className="rounded-full left-0 group-hover:bg-primary group-hover:max-w-full transition-all ease-linear duration-200 z-10 absolute max-w-[3rem] w-full h-12 flex justify-center items-center text-primary border border-primary"></span>
      </Link>
   );
};

export default BtnArrow;
