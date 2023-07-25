import styles from "./index.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// import ScrollDown from '../../components/scrollDown'
import { useRef, useState } from "react";
import Snackbar from "../../components/snackbar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AviationFrom from "@/components/AviationFrom";
import {
   faPhoneAlt,
   faEnvelope,
   faMobile,
   faLocationPin,
   faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
   faWhatsapp,
   faTiktok,
   faInstagram,
   faTwitter,
   faSnapchat,
   faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBacktoData } from "@/slices/backto";

const Accordion = ({ item }) => {
	const [open, setOpen] = useState(false);
   return (
      <button onClick={() => setOpen(!open)} className={`flex bg-gray-100 text-black dark:text-white dark:bg-gray-800 p-4 justify-between items-center relative transition-[border-radius] duration-500 ${open ? "rounded-t-xl" : "rounded-xl"}`}>
         <Image src={item.img} width={50} height={50} alt="air arabia" />
         <p>{item.name}</p>
         <FontAwesomeIcon icon={faAngleDown} className={`transition duration-500 text-xl ${open ? "rotate-180" : ""}`} />
			<div className={`absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-800 rounded-b-xl overflow-hidden transition-all duration-500 z-10 ${open ? "max-h-[700px]" : "max-h-0"}`}>
				{item.detail.map((detail, index) => {
					return (
						<Link href={detail.link} key={index} className="flex justify-between items-center p-4 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
							<p>{detail.name}</p>
							<p>{detail.price}</p>
						</Link>
					)
				})}
			</div>
      </button>
   );
};

const Aviation = ({ slide }) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setBacktoData({ href: "/", title: "الرئيسية" }));
   }, []);
   const settings = useSelector((state) => state.settings.value);
   const en = useSelector((state) => state.langs.value);
   const [snackbarMsg, setSnackbarMsg] = useState("");
   const snackbarRef = useRef(null);
   // const [snackbarMsg2, setSnackbarMsg2] = useState("");
   // const snackbarRef2 = useRef(null);
   const [formErrors, setFormErrors] = useState({});
   // const [formErrors2, setFormErrors2] = useState({});
   const slides = slide;
   const validate = (values) => {
      const errors = {};
      if (!values.fullname) {
         errors.fullname = "الاسم بالكامل مطلوب";
      }
      if (!values.phone) {
         errors.phone = "رقم الهاتف مطلوب";
      }
      if (!values.travel_from) {
         errors.travel_from = "حقل السفر من مطلوب";
      }
      if (!values.travel_to) {
         errors.travel_to = "حقل السفر الي مطلوب";
      }
      if (!values.adults) {
         errors.adults = "حقل عدد المسافرين مطلوب";
      }
      if (!values.childs) {
         errors.childs = "حقل عدد الاطفال مطلوب";
      }
      if (!values.traveling_date) {
         errors.traveling_date = "حقل تاريخ السفر مطلوب";
      }
      if (!values.back_date) {
         errors.back_date = "حقل تاريخ العودة مطلوب";
      }
      return errors;
   };
   // const validate2 = (values) => {
   //    const errors = {};
   //    if (!values.type) {
   //       errors.type = "نوع الرحلة مطلوب";
   //    }
   //    if (!values.travellers_number) {
   //       errors.travellers_number = "عدد المسافرين مطلوب";
   //    }
   //    if (!values.travel_from) {
   //       errors.travel_from = "حقل السفر من مطلوب";
   //    }
   //    if (!values.travel_to) {
   //       errors.travel_to = "حقل السفر الي مطلوب";
   //    }
   //    if (!values.traveling_date) {
   //       errors.traveling_date = "حقل تاريخ السفر مطلوب";
   //    }
   //    if (!values.back_date) {
   //       errors.back_date = "حقل تاريخ العودة مطلوب";
   //    }
   //    return errors;
   // };
   const handleSubmit = async (event) => {
      try {
         event.preventDefault();

         // Get data from the form.
         const data = {
            travel_from: event.target.travel_from.value,
            travel_to: event.target.travel_to.value,
            traveling_date: event.target.traveling_date.value,
            back_date: event.target.back_date.value,
            fullname: event.target.fullname.value,
            phone: event.target.phone.value,
            childs: event.target.childs.value,
            adults: event.target.adults.value,
            notes: event.target.notes.value,
         };
         setFormErrors(validate(data));
         // Send the data to the server in JSON format.
         const JSONdata = JSON.stringify(data);

         // API endpoint where we send form data.
         const endpoint =
            "https://backend.elnagahtravels.com/public/api/aviation";

         // Form the request for sending data to the server.
         const options = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSONdata,
         };

         if (Object.keys(validate(data)).length === 0) {
            const response = await fetch(endpoint, options);
            const result = await response.json();
            setSnackbarMsg(result?.message || result);
            snackbarRef.current.show();
            event.target.reset();
         }
      } catch (error) {
         console.log(error);
      }
   };
   // const handleSubmit2 = async (event) => {
   //    try {
   //       event.preventDefault();

   //       // Get data from the form.
   //       const data = {
   //          travel_from: event.target.travel_from.value,
   //          travel_to: event.target.travel_to.value,
   //          traveling_date: event.target.traveling_date.value,
   //          back_date: event.target.back_date.value,
   //          type: event.target.type.value,
   //          retreiv_taxes: event.target.retreiv_taxes.checked ? "1" : "0",
   //          direct_trips: event.target.direct_trips.checked ? "1" : "0",
   //          travellers_number: event.target.travellers_number.value,
   //       };
   //       setFormErrors2(validate2(data));
   //       // Send the data to the server in JSON format.
   //       const JSONdata = JSON.stringify(data);

   //       // API endpoint where we send form data.
   //       const endpoint =
   //          "https://backend.elnagahtravels.com/public/api/aviation2";

   //       // Form the request for sending data to the server.
   //       const options = {
   //          method: "POST",
   //          headers: {
   //             "Content-Type": "application/json",
   //          },
   //          body: JSONdata,
   //       };

   //       const response = await fetch(endpoint, options);

   //       if (Object.keys(validate2(data)).length === 0) {
   //          const result = await response.json();
   //          setSnackbarMsg2(result?.message || result);
   //          snackbarRef2.current.show();
   //          event.target.reset();
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };
	const airs = [
		{
			name: "الخطوط السعودية",
			img: "/images/air1.png",
			detail: [
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
			]
		},
		{
			name: "الخطوط السعودية",
			img: "/images/air2.png",
			detail: [
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
			]
		},
		{
			name: "الخطوط السعودية",
			img: "/images/air3.png",
			detail: [
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
			]
		},
		{
			name: "الخطوط السعودية",
			img: "/images/air4.png",
			detail: [
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
			]
		},
		{
			name: "الخطوط السعودية",
			img: "/images/air5.png",
			detail: [
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
				{
					name: "الخطوط السعودية",
					price: "1000",
					link: "#",
				},
			]
		},
	]
   return (
      <>
         <Head>
            <title>الطيران</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta property="og:title" content="الطيران" />
            <meta
               property="og:url"
               content="https://last-delta.vercel.app/aviation"
            />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta name="twitter:title" content="الطيران" />
            <meta
               name="twitter:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
         </Head>
         <div className={styles.hero__bg}>
            {slides[0]?.image && (
               <Image
                  src={slides[0]?.image}
                  alt={slides[0]?.title}
                  fill
                  loading="eager"
                  className="object-cover"
               />
            )}
            <h1 className={`md:hidden ${styles.hero__title}`}>
               {slides[0]?.title}
            </h1>
            <p className={`md:hidden ${styles.hero__text}`}>
               {slides[0]?.button_text}
            </p>
            {/* <ScrollDown /> */}
            <div className="container hidden md:block">
            <AviationFrom />
            </div>
         </div>
         <div className={styles.form}>
            <div className="container md:hidden">
            <AviationFrom />
            </div>
            {/* <Snackbar
               ref={snackbarRef2}
               message={snackbarMsg2}
               type={"success"}
            /> */}
            <div className="container mb-16">
               <div className="flex flex-col max-w-xl mx-auto mb-10 text-center gap-4">
                  <h2 className="text-2xl">
                     أفضل أسعار تذاكر الطيران مع أشهر خطوط الطيران العالمية
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                     تعرف على أرخص حجوزات الطيران واختر من بين أكثر من 500 خط
                     طيران بأفضل الأسعار على موقعنا
                  </p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
						{airs.map((air, index) => <Accordion key={index} item={air} />)}
               </div>
            </div>
            <h2 className={styles.form__title}>
               احجز تذكرة طيران خاصة بك الآن
            </h2>
            <div
               className={`bg-white dark:bg-gray-800 dark:text-white rounded-xl overflow-hidden ${styles.form__data}`}
               id="form"
            >
               <form className={styles.form__content} onSubmit={handleSubmit}>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <label htmlFor="firstname">الاسم بالكامل</label>
                        <input
                           type="text"
                           id="firstname"
                           name="fullname"
                           placeholder="الاسم بالكامل"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.fullname}
                        </small>
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="phone">رقم الجوال</label>
                        <input
                           type="number"
                           id="phone"
                           name="phone"
                           placeholder="رقم الجوال"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.phone}
                        </small>
                     </div>
                  </div>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <label htmlFor="passengers">عدد البالغين</label>
                        <input
                           type="number"
                           id="passengers"
                           name="adults"
                           placeholder="عدد المسافرين"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.adults}
                        </small>
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="children">عدد الاطفال</label>
                        <input
                           type="number"
                           id="children"
                           name="childs"
                           placeholder="عدد الاطفال"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.childs}
                        </small>
                     </div>
                  </div>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <label htmlFor="from">السفر من</label>
                        <input
                           type="text"
                           id="from"
                           name="travel_from"
                           placeholder="بلد المسكن"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.travel_from}
                        </small>
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="to">السفر الي</label>
                        <input
                           type="text"
                           id="to"
                           name="travel_to"
                           placeholder="الوجهة"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.travel_to}
                        </small>
                     </div>
                  </div>
                  <div className={styles.row}>
                     <div className={styles.field}>
                        <label htmlFor="date">تاريخ السفر</label>
                        <input
                           type="date"
                           id="date"
                           name="traveling_date"
                           placeholder="تاريخ السفر"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.traveling_date}
                        </small>
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="backdate">تاريخ العودة</label>
                        <input
                           type="date"
                           id="backdate"
                           name="back_date"
                           placeholder="تاريخ العودة"
                           className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                        />
                        <small style={{ color: "red", fontSize: ".6rem" }}>
                           {formErrors?.back_date}
                        </small>
                     </div>
                  </div>
                  <div className={styles.field}>
                     <label htmlFor="details">تفاصيل أخري</label>
                     <textarea
                        id="details"
                        name="notes"
                        placeholder="اكتب اي تفاصيل أخري هنا..."
                        rows="5"
                        cols="2"
                        className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                     />
                  </div>
                  <button type="submit" className={styles.form__btn}>
                     ارسال
                  </button>
               </form>
               <Snackbar
                  ref={snackbarRef}
                  message={snackbarMsg}
                  type={"success"}
               />
               <div className={styles.form__img}>
                  <h3 className="main__title" id="main-title">
                     تواصل معنا عبر
                  </h3>
                  <div className={styles.contact__data}>
                     <div className={styles.contact__data__card}>
                        <h3 className={styles.contact__title}>الجوال</h3>
                        <div className={styles.contact__card}>
                           <a
                              aria-label={settings.mobile}
                              href={`tel:${settings.mobile}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.contact__link}
                           >
                              {settings.mobile}
                           </a>
                           {/* <BsPhoneFill /> */}
                           <FontAwesomeIcon icon={faMobile} />
                        </div>
                        <div className={styles.contact__card}>
                           <a
                              aria-label={settings.whatsup}
                              href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.contact__link}
                           >
                              {settings.whatsup}
                           </a>
                           {/* <BsWhatsapp /> */}
                           <FontAwesomeIcon icon={faWhatsapp} />
                        </div>
                        <div className={styles.contact__card}>
                           <a
                              aria-label={settings.phone}
                              href={`tel:${settings.phone}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.contact__link}
                           >
                              {settings.phone}
                           </a>
                           {/* <GiRotaryPhone /> */}
                           <FontAwesomeIcon icon={faPhoneAlt} />
                        </div>
                     </div>
                     <div className={styles.contact__data__card}>
                        <h3 className={styles.contact__title}>
                           البريد الالكتروني
                        </h3>
                        <div className={styles.contact__card}>
                           <a
                              aria-label={settings.email}
                              href={`mailto:${settings.email}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.contact__link}
                           >
                              {settings.email}
                           </a>
                           {/* <BsEnvelopeFill /> */}
                           <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                     </div>
                     <div className={styles.contact__data__card}>
                        <h3 className={styles.contact__title}>العنوان</h3>
                        <div className={styles.address}>
                           {/* <MdLocationOn /> */}
                           <FontAwesomeIcon
                              icon={faLocationPin}
                              style={{ height: "1rem" }}
                           />
                           <span>{en ? settings.address_en : settings.address}</span>
                        </div>
                     </div>
                  </div>
                  <div className={styles.social__icons}>
                     <a
                        aria-label={"instagram"}
                        href={settings.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.instagram}
                     >
                        {/* <BsInstagram /> */}
                        <FontAwesomeIcon icon={faInstagram} />
                     </a>
                     <a
                        aria-label="Twitter"
                        href={settings.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.twitter}
                     >
                        {/* <BsTwitter /> */}
                        <FontAwesomeIcon icon={faTwitter} />
                     </a>
                     <a
                        aria-label="tiktok"
                        href={settings.tiktok}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.tiktok}
                     >
                        {/* <FaTiktok /> */}
                        <FontAwesomeIcon icon={faTiktok} />
                     </a>
                     <a
                        aria-label="snapchat"
                        href={settings.snapchat}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.snapchat}
                     >
                        {/* <BsSnapchat /> */}
                        <FontAwesomeIcon icon={faSnapchat} />
                     </a>
                     <a
                        aria-label="youtube"
                        href={settings.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.youtube}
                     >
                        {/* <BsYoutube /> */}
                        <FontAwesomeIcon icon={faYoutube} />
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Aviation;

export async function getServerSideProps() {
   const response = await fetch(
      "https://backend.elnagahtravels.com/public/api/slides?page=aviation"
   );
   const {
      data: { slide },
   } = await response.json();
   return {
      props: {
         slide,
      },
   };
}
