import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const BtnArrow = (props) => {
   const en = useSelector((state) => state.langs.value);
   return (
      <Link
         href={props.href}
         className={`${props.classes} group flex lg:mx-0 text-sm hover:text-white transition-all duration-[.45s] relative hover:px-6 ${en ? "pr-4" : "pl-4"} h-12 items-center w-fit btnarrow whitespace-nowrap`}
      >
         <div className="z-20 lg:text-base flex group-hover:gap-4 gap-8 relative items-center transition-all ease-linear duration-200">
            {props.title}
            {/* <i className="fal fa-arrow-left text-primary group-hover:text-white"></i> */}
            <FontAwesomeIcon icon={en ? faArrowRight : faArrowLeft} className='text-primary group-hover:text-white' />
         </div>
         <span className={`rounded-full ${en ? "right-0" : "left-0"} group-hover:bg-primary group-hover:max-w-full transition-all ease-linear duration-200 z-10 absolute max-w-[3rem] w-full h-12 flex justify-center items-center text-primary border border-primary`}></span>
      </Link>
   );
};

export default BtnArrow;
