/* eslint-disable no-unused-vars */
import React from "react";
import Image from "next/image";
import Head from "next/head";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBacktoData } from "@/slices/backto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Contact({ slide }) {
   const settings = useSelector((state) => state.settings.value);
   const en = useSelector((state) => state.langs.value);
   const dispatch = useDispatch();
   const [snackbarMsg, setSnackbarMsg] = useState("");
   const [formErrors, setFormErrors] = useState({});
   const regex = /^\S+@\S+\.\S+$/;
   const snackbarRef = useRef(null);

   useEffect(() => {
      dispatch(setBacktoData({ href: "/", title: "الرئيسية" }));
   }, []);

   const validate = (values) => {
      const errors = {};
      if (!values.first_name) {
         errors.message = "الاسم الأول مطلوب";
      }
      if (!values.last_name) {
         errors.name = "الأسم الأخير مطلوب";
      }
      if (!values.email) {
         errors.email = "البريد الألكتروني مطلوب";
      } else if (!regex.test(values.email)) {
         errors.email = "البريد الالكتروني غير صالح";
      }
      if (!values.phone) {
         errors.phone = "رقم الهاتف مطلوب";
      }
      if (!values.subject) {
         errors.subject = "يجب ادخال عنوان الرسالة";
      }
      if (!values.message) {
         errors.message = "الرسالة مطلوبة";
      }
      return errors;
   };
   const handleSubmit = async (event) => {
      try {
         event.preventDefault();

         // Get data from the form.
         const form = new FormData(event.target);
         const data = Object.fromEntries(form.entries());
         console.log(data);
         // const data = {
         //    name: event.target.name.value,
         //    email: event.target.email.value,
         //    phone: event.target.phone.value,
         //    message: event.target.message.value,
         // }
         setFormErrors(validate(data));

         // Send the data to the server in JSON format.
         const JSONdata = JSON.stringify(data);

         // API endpoint where we send form data.
         const endpoint =
            "https://backend.elnagahtravels.com/public/api/contact_us";

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
   return (
      <>
         <Head>
            <title>تواصل معنا</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta property="og:title" content="تواصل معنا" />
            <meta
               property="og:url"
               content="https://last-delta.vercel.app/contact"
            />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta name="twitter:title" content="تواصل معنا" />
            <meta
               name="twitter:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
         </Head>
         <div className="flex flex-col">
            <div className="hidden md:block h-40 w-full bg-secondary"></div>
            <div className="h-52 w-full flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
               <div className="flex text-white flex-col gap-4 items-center relative z-30">
                  <h1 className="text-3xl">{slide[0].button_text}</h1>
                  <p>{slide[0].title}</p>
               </div>
               <Image
                  src={slide[0].image}
                  alt={slide[0].button_text}
                  fill
                  className="object-cover"
               />
            </div>
            <div className="container">
               <div className="hidden mb-8 md:block border-b dark:border-gray-700">
                  <Breadcrumbs
                     list={[{ title: en ? "Contact us" : "تواصل معنا" }]}
                  />
               </div>
               <div className="grid grid-cols-1 gap-8 md:grid-cols-6 dark:text-white pb-8">
                  <div className="md:col-span-4">
                     <h2 className="text-2xl my-4 md:m-0">
                        {en ? "Contact us" : "تواصل معنا"}
                     </h2>
                     <p>
                        {en ? "Please fill out the following form to receive your message by e-mail" : "الرجاء ملء النموذج التالي لتصلنا رسالتك بالبريد الإلكتروني"}
                     </p>
                     <form
                        onSubmit={(e) => handleSubmit(e)}
                        id="myForm"
                        className="pt-8 flex flex-col gap-8"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                           <div className="flex flex-col gap-4">
                              <label
                                 htmlFor="name"
                                 className="flex gap-4 items-end"
                              >
                                 {en ? "First Name" : "الاسم الاول"}
                                 <small
                                    style={{ color: "red", fontSize: ".6rem" }}
                                 >
                                    {formErrors?.name}
                                 </small>
                              </label>
                              <input
                                 type="text"
                                 id="first_name"
                                 name="first_name"
                                 className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                              />
                           </div>
                           <div className="flex flex-col gap-4">
                              <label
                                 htmlFor="name"
                                 className="flex gap-4 items-end"
                              >
                                 {en ? "Last Name" : "الاسم الاخير"}
                                 <small
                                    style={{ color: "red", fontSize: ".6rem" }}
                                 >
                                    {formErrors?.name}
                                 </small>
                              </label>
                              <input
                                 type="text"
                                 id="last_name"
                                 name="last_name"
                                 className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                              />
                           </div>
                           <div className="flex flex-col gap-4">
                              <label
                                 htmlFor="phone"
                                 className="flex gap-4 items-end"
                              >
                                 {en ? "Phone number" : "رقم الجوال"}
                                 <small
                                    style={{ color: "red", fontSize: ".6rem" }}
                                 >
                                    {formErrors?.phone}
                                 </small>
                              </label>
                              <input
                                 type="number"
                                 id="phone"
                                 name="phone"
                                 className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                              />
                           </div>
                           <div className="flex flex-col gap-4">
                              <label
                                 htmlFor="email"
                                 className="flex gap-4 items-end"
                              >
                                 {en ? "Email" : "البريد الالكتروني"}
                                 <small
                                    style={{ color: "red", fontSize: ".6rem" }}
                                 >
                                    {formErrors?.email}
                                 </small>
                              </label>
                              <input
                                 type="text"
                                 id="email"
                                 name="email"
                                 className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                              />
                           </div>
                        </div>
                        <div className="flex flex-col gap-4">
                           <label
                              htmlFor="phone"
                              className="flex gap-4 items-end"
                           >
                              {en ? "Subject" : "الموضوع"}
                              <small
                                 style={{ color: "red", fontSize: ".6rem" }}
                              >
                                 {formErrors?.subject}
                              </small>
                           </label>
                           <select
                              size="1"
                              name="subject"
                              id="subject"
                              className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                              autocomplete="off"
                           >
                              <option selected="selected" value="">
                                 اختر
                              </option>
                              <option value="Information about Flyin.com  ">
                                 معلومات عن فلاي إن
                              </option>
                              <option value="Information about a destination">
                                 معلومات عن مدينة او دولة
                              </option>
                              <option value="Feedback">أراء وملاحظات</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-4">
                           <label
                              htmlFor="message"
                              className="flex gap-4 items-end"
                           >
                              {en ? "Message" : "الرسالة"}
                              <small
                                 style={{ color: "red", fontSize: ".6rem" }}
                              >
                                 {formErrors?.message}
                              </small>
                           </label>
                           <textarea
                              id="message"
                              name="message"
                              rows="5"
                              className="dark:bg-gray-900 border dark:border-gray-700 px-4 py-3 bg-gray-100 rounded outline-none"
                           />
                        </div>
                        <div className="flex gap-4 justify-end">
                           <button
                              type="reset"
                              className="dark:bg-yellow-600 text-white bg-yellow-400 dark:text-black px-4 py-3 rounded-md border dark:border-yellow-700 border-yellow-500"
                           >
                              {en ? "Reset" : "إعادة ضبط"}
                           </button>
                           <button
                              type="submit"
                              className="bg-secondary text-white dark:bg-gray-200 dark:text-black px-4 py-3 rounded-md border border-gray-800 dark:border-gray-400"
                           >
                              {en ? "Send" : "ارسال"}
                           </button>
                        </div>
                     </form>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-4">
                     <div className="bg-gray-100 dark:bg-gray-900">
                        <div className="p-4 flex items-end gap-4 bg-secondary text-white dark:bg-gray-800">
                           <span className="text-3xl bold">24/7</span>
                           <h3 className="text-xl">{en ? "Call center" : "خدمة العملاء"}</h3>
                        </div>
                        <div className="p-4 space-y-4">
                           <div className="flex flex-col gap-2 text-sm">
                              <div className="tex">{en ? "Call" : "للاتصال"}:</div>
                              <Link
                                 href="#"
                                 className="flex flex-col text-gray-600 dark:text-primary"
                              >
                                 <div className="flex">
                                    <FontAwesomeIcon icon={faPhoneAlt} />
                                    <span className="mx-2 bold">920033029</span>
                                 </div>
                              </Link>
                              <Link
                                 href="#"
                                 className="flex flex-col text-gray-600 dark:text-primary"
                              >
                                 <div className="flex">
                                    <FontAwesomeIcon icon={faPhoneAlt} />
                                    <span className="mx-2 bold">920033029</span>
                                 </div>
                              </Link>
                           </div>
                           <div className="flex flex-col gap-2 text-sm">
                              <div className="tex">{en ? "Contact via WhatsApp" : "للتواصل عبر الواتساب"}:</div>
                              <Link
                                 href="#"
                                 className="flex flex-col text-gray-600 dark:text-primary"
                              >
                                 <div className="flex">
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                    <span className="mx-2 bold">920033029</span>
                                 </div>
                              </Link>
                           </div>
                           <div className="flex flex-col gap-2 text-sm">
                              <div className="tex">{en ? "For any other inquiries" : "لأي استفسارات أخرى"}:</div>
                              <Link
                                 href="#"
                                 className="flex flex-col text-gray-600 dark:text-primary"
                              >
                                 <div className="flex">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span className="mx-2 bold">
                                       email@email.com
                                    </span>
                                 </div>
                              </Link>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-100 dark:bg-gray-900 p-4 space-y-4">
                        <h4 className="text-xl">{en ? "Our Address" : "عنواننا"}:</h4>
                        <Link
                           href="https://www.google.com/maps/place/24%C2%B042'28.7%22N+46%C2%B037'39.0%22E/@24.707979,46.6254091,16z/data=!4m4!3m3!8m2!3d24.7079785!4d46.627512?hl=en-US"
                           className="flex text-gray-600 hover:underline"
                        >
                           {settings.address}
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-6 py-16 mx-auto">
                  <Link
                     href={"#"}
                     className="scc flex items-center flex-col gap-4 p-4 rounded-lg shadow-lg"
                  >
                     <div className="relative rounded-full w-32 h-32 bg-primary/50 shadow-md">
                        <Image
                           src="/icons/terms.png"
                           alt="icon"
                           width={70}
                           height={70}
                           className="absolute drop-shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                     </div>
                     <h6>{en ? "Terms & Conditions" : "الشروط و الأحكام"}</h6>
                  </Link>
                  <Link
                     href={"#"}
                     className="scc flex items-center flex-col gap-4 p-4 rounded-lg shadow-lg"
                  >
                     <div className="relative rounded-full w-32 h-32 bg-primary/50 shadow-md">
                        <Image
                           src="/icons/privacy.png"
                           alt="icon"
                           width={70}
                           height={70}
                           className="absolute drop-shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                     </div>
                     <h6>{en ? "Privacy policy" : "سياسة الخصوصية"}</h6>
                  </Link>
                  <Link
                     href={"#"}
                     className="scc flex items-center flex-col gap-4 p-4 rounded-lg shadow-lg"
                  >
                     <div className="relative rounded-full w-32 h-32 bg-primary/50 shadow-md">
                        <Image
                           src="/icons/help.png"
                           alt="icon"
                           width={70}
                           height={70}
                           className="absolute drop-shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                     </div>
                     <h6>{en ? "FAQs" : "الأسئلة الشائعة"}</h6>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}

export async function getServerSideProps() {
   const slidersRes = await fetch(
      "https://backend.elnagahtravels.com/public/api/slides?page=contact_us"
   );

   const {
      data: { slide = [] },
   } = await slidersRes.json();

   return { props: { slide } };
}
