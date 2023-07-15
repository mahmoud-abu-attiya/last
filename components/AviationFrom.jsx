/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AviationFrom() {
   const [formErrors2, setFormErrors2] = useState({});
   const [trips, setTrips] = useState(1);
   const [snackbarMsg2, setSnackbarMsg2] = useState("");
   const [type, setType] = useState("go");
   const snackbarRef2 = useRef(null);
   const validate2 = (values) => {
      const errors = {};
      if (!values.type) {
         errors.type = "نوع الرحلة مطلوب";
      }
      if (!values.travellers_number) {
         errors.travellers_number = "عدد المسافرين مطلوب";
      }
      if (!values.travel_from) {
         errors.travel_from = "حقل السفر من مطلوب";
      }
      if (!values.travel_to) {
         errors.travel_to = "حقل السفر الي مطلوب";
      }
      if (!values.traveling_date) {
         errors.traveling_date = "حقل تاريخ السفر مطلوب";
      }
      if (!values.back_date) {
         errors.back_date = "حقل تاريخ العودة مطلوب";
      }
      return errors;
   };
   const handleSubmit2 = async (event) => {
      try {
         event.preventDefault();

         // Get data from the form.
         const data = {
            travel_from: event.target.travel_from.value,
            travel_to: event.target.travel_to.value,
            traveling_date: event.target.traveling_date.value,
            back_date: event.target.back_date.value,
            type: type,
            // retreiv_taxes: event.target.retreiv_taxes.checked ? "1" : "0",
            // direct_trips: event.target.direct_trips.checked ? "1" : "0",
            travellers_number: event.target.travellers_number.value,
         };
         setFormErrors2(validate2(data));
         // Send the data to the server in JSON format.
         const JSONdata = JSON.stringify(data);

         // API endpoint where we send form data.
         const endpoint =
            "https://backend.elnagahtravels.com/public/api/aviation2";

         // Form the request for sending data to the server.
         const options = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSONdata,
         };

         const response = await fetch(endpoint, options);

         if (Object.keys(validate2(data)).length === 0) {
            const result = await response.json();
            setSnackbarMsg2(result?.message || result);
            snackbarRef2.current.show();
            event.target.reset();
         }
      } catch (error) {
         console.log(error);
      }
   };
   const NewData = ({ cansel }) => {
      return (
         <div
            className={`border-b dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4`}
         >
            <div className={`dark:border-gray-700`}>
               <label htmlFor="travel_from" className={""}>
                  من
               </label>
               <div>
                  {/* <MdLocationOn /> */}
                  <input
                     type="text"
                     placeholder="بلد المسكن"
                     name="travel_from"
                     id="travel_from"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.travel_from}
               </small>
            </div>
            <div className={`dark:border-gray-700`}>
               <label htmlFor="travel_to" className={""}>
                  الي
               </label>
               <div>
                  {/* <MdLocationOn /> */}
                  <input
                     type="text"
                     placeholder="الوجهة"
                     name="travel_to"
                     id="travel_to"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.travel_to}
               </small>
            </div>
            <div className={`dark:border-gray-700`}>
               <label htmlFor="traveling_date" classname="{styles.card__title}">
                  تاريخ السفر
               </label>
               <div>
                  <input
                     type="date"
                     name="traveling_date"
                     id="traveling_date"
                     pattern="\d{2}-\d{2}-\d{4}"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.traveling_date}
               </small>
            </div>
            {!cansel && <button className="text-start" onClick={() => setTrips(trips - 1)}>
               <FontAwesomeIcon icon={faTimes} />
            </button>}
         </div>
      );
   };
   const addTrips = () => {
      if (trips < 7) {
         setTrips(trips + 1);
      }
   }
   return (
      <form
         className={`bg-gray-100 dark:bg-gray-800 dark:text-white text-secondary rounded-xl text-start w-full max-h-[600px] overflow-y-auto`}
         onSubmit={handleSubmit2}
      >
         <div className={`border-b dark:border-gray-700 p-4`}>
            <div className={"flex gap-4"}>
               <button
                  type="button"
                  className={`px-4 py-2 border rounded-lg transition ${
                     type == "go"
                        ? "bg-gray-300 border-primary dark:bg-gray-900"
                        : " bg-gray-200/25 dark:bg-gray-900/25 border-transparent shadow-inner"
                  }`}
                  onClick={() => setType("go")}
               >
                  ذهاب فقط
               </button>
               <button
                  type="button"
                  className={`px-4 py-2 border rounded-lg transition ${
                     type == "goAndBack"
                        ? "bg-gray-300 border-primary dark:bg-gray-900"
                        : " bg-gray-200/25 dark:bg-gray-900/25 border-transparent shadow-inner"
                  }`}
                  onClick={() => setType("goAndBack")}
               >
                  ذهاب وعودة
               </button>
               <button
                  type="button"
                  className={`px-4 py-2 border rounded-lg transition ${
                     type == "multi"
                        ? "bg-gray-300 border-primary dark:bg-gray-900"
                        : " bg-gray-200/25 dark:bg-gray-900/25 border-transparent shadow-inner"
                  }`}
                  onClick={() => setType("multi")}
               >
                  وجهات متعددة
               </button>
            </div>
         </div>
         <div
            className={`border-b dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 ${
               type !== "goAndBack" ? "lg:grid-cols-4" : "lg:grid-cols-5"
            } gap-4 p-4`}
         >
            <div className={`dark:border-gray-700`}>
               <label htmlFor="travel_from" className={""}>
                  من
               </label>
               <div>
                  {/* <MdLocationOn /> */}
                  <input
                     type="text"
                     placeholder="بلد المسكن"
                     name="travel_from"
                     id="travel_from"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.travel_from}
               </small>
            </div>
            <div className={`dark:border-gray-700`}>
               <label htmlFor="travel_to" className={""}>
                  الي
               </label>
               <div>
                  {/* <MdLocationOn /> */}
                  <input
                     type="text"
                     placeholder="الوجهة"
                     name="travel_to"
                     id="travel_to"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.travel_to}
               </small>
            </div>
            <div className={`dark:border-gray-700`}>
               <label htmlFor="traveling_date" classname="{styles.card__title}">
                  تاريخ السفر
               </label>
               <div>
                  <input
                     type="date"
                     name="traveling_date"
                     id="traveling_date"
                     pattern="\d{2}-\d{2}-\d{4}"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.traveling_date}
               </small>
            </div>
            {type == "goAndBack" && (
               <div className={`dark:border-gray-700`}>
                  <label htmlFor="back_date" className={""}>
                     تاريخ العودة
                  </label>
                  <div>
                     <input
                        type="date"
                        name="back_date"
                        id="back_date"
                        pattern="\d{2}-\d{2}-\d{4}"
                        className={`dark:bg-gray-800 border-b dark:border-gray-700 w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                     />
                  </div>
                  <small style={{ color: "red", fontSize: ".6rem" }}>
                     {formErrors2?.back_date}
                  </small>
               </div>
            )}
            <div className={`dark:border-gray-700`} style={{ border: "none" }}>
               <label htmlFor="travellers_number" className={""}>
                  عدد المسافرين
               </label>
               <div>
                  {/* <BsFillPeopleFill /> */}
                  <input
                     type="number"
                     name="travellers_number"
                     id="travellers_number"
                     placeholder="عدد المسافرين"
                     className={`dark:bg-gray-800 border-b dark:border-gray-700  w-full outline-none focus:border-primary dark:focus:bg-gray-900 p-2`}
                  />
               </div>
               <small style={{ color: "red", fontSize: ".6rem" }}>
                  {formErrors2?.travellers_number}
               </small>
            </div>
         </div>
         {type == "multi" && Array(trips).fill(0).map((_, i) => <NewData key={i} cansel={i == 0 ? true : false} />)}
         {/* <div className={""}>
            <input type="checkbox" name="direct_trips" id="direct_trips" />
            <label htmlFor="direct_trips">رحلات مباشرة</label>
            <input type="checkbox" name="retreiv_taxes" id="retreiv_taxes" />
            <label htmlFor="retreiv_taxes">ضريبة الاسترجاع</label>
         </div> */}
         {type == "multi" && <div className="p-4">
         <button onClick={addTrips}>
            <FontAwesomeIcon icon={faPlus} />{" "}
            أضف رحلة أخرى ( 6 رحلات بحد اقصى )
         </button>
         </div>}
         <div className="p-4 flex items-center justify-center">
            <button
               type="submit"
               className={
                  "py-3 px-8 flex gap-4 items-center bg-primary rounded-lg"
               }
            >
               بحث
               <FontAwesomeIcon icon={faSearch} />
            </button>
         </div>
      </form>
   );
}
