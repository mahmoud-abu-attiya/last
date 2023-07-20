import Image from "next/image";
import Link from "next/link";
import BtnArrow from "../BtnArrow";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faStar,
   faSun,
   faMoon,
   faUserFriends,
   faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const NewPrograms = ({ programs, en }) => {
   useEffect(() => {
      console.log(programs);
   }, []);
   const settings = useSelector((state) => state.settings.value);
   const message = (id) => {
      const program = programs.find((p) => p.id === id);
      return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price}`;
   };
   return (
      <div className={styles.newPrograms__container}>
         <h2
            className={`dark:text-white ${styles.newPrograms__title}`}
            // variants={topToBottomAnimation}
            // initial='hidden'
            // whileInView='show'
            // viewport={{ once: true }}
         >
            {en ? "The latest tourism programs" : "أحدث البرامج السياحية"}
         </h2>
         <div className={styles.newPrograms__cards}>
            {programs.slice(0, 3).map((program) => (
               <div className={styles.newPrograms__card} key={program.id}>
                  <div className={styles.newPrograms__img__container}>
                     <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className={styles.newPrograms__card__img}
                     />
                  </div>
                  <div
                     className={`bg-white dark:bg-gray-900 text-secondary dark:text-white ${styles.newPrograms__card__content}`}
                  >
                     <div
                        className={` bg-secondary text-white dark:bg-white dark:text-secondary ${styles.newPrograms__card__period}`}
                     >
                        <span>
                           <FontAwesomeIcon icon={faSun} />
                           {program.days} {en ? "Days" : "أيام"}
                        </span>
                        <span>
                           <FontAwesomeIcon icon={faMoon} />
                           {program.nights} {en ? "Nights" : "ليالي"}
                        </span>
                        <span>
                           <FontAwesomeIcon icon={faLocation} />
                           {en ? program.country.name_en : program.country.name}
                        </span>
                        {program.people && (
                           <span>
                              <FontAwesomeIcon icon={faUserFriends} />
                              {program.people}
                           </span>
                        )}
                     </div>
                     <div className={styles.newPrograms__heading__container}>
                        <div className={styles.newPrograms__heading}>
                           <Link
                              href={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
                           >
                              <h3 className={styles.newPrograms__card__title}>
                                 {en ? program.title_en : program.title}{" "}
                                 {program.category.name &&
                                    en ? program.category.name_en : program.category.name}{" "}
                              </h3>
                           </Link>
                        </div>
                        <div className={styles.stars}>
                           {Array.from(Array(program.rate)).map((s, i) => (
                              <FontAwesomeIcon icon={faStar} key={i} />
                           ))}
                        </div>
                     </div>
                     <div className={styles.newPrograms__card__price}>
                        <span className={styles.new__price}>
                           {program.price}
                        </span>{" "}
                        {en ? "SR" : "ريال سعودي"}
                     </div>
                     <div className={styles.newPrograms__card__btns}>
                        <BtnArrow
                           title={en ? "Offer details" : "تفاصيل العرض"}
                           href={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
                        />
                        <BtnArrow
                           title={en ? "Book Offer" : "حجز العرض"}
                           href={`https://api.whatsapp.com/send?phone=${
                              settings.whatsup
                           }&${message(program.id)}`}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default NewPrograms;
