import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { faInstagram, faTwitter, faYoutube, faWhatsapp, faTiktok, faSnapchat } from '@fortawesome/free-brands-svg-icons'
import { faMobile, faAngleLeft, faEnvelopeOpenText, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { setTheme } from '../../../slices/themeSlice'
// import localFont from 'next/font/local';
import { handelLangs } from '../../../slices/langsSlice'

// const noto = localFont({ src: '../../../public/fonts/NotoNaskhArabic-Regular.ttf' })

const SubFooter = ({ settings, en }) => {
   const [glitter, setGlitter] = useState(1)
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         if (glitter < 5) {
            setGlitter(e => e + 1);
         } else {
            setGlitter(1);
         }
      }, 2000);

      return () => clearTimeout(timeoutId);
   }, [glitter]);

   return (
      <div className="sticky subFooter bottom-0 lg:p-4 lg:px-16 grid grid-cols-4 lg:bg-gray-100 lg:dark:bg-gray-800 lg:dark:text-white z-20 lg:gap-0">
         <a href={`tel:${settings.mobile}`} className={`${glitter === 1 ? "glitter" : ""} lg:shadow-none phone bg-[green] p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 ${en ? "lg:border-r-2 border-gray-300" : ""}`} target='_blank' rel='noreferrer' aria-label='Mobile'>
            {/* <i className="fal fa-mobile text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
            <div className="icon">
               <FontAwesomeIcon icon={faMobile} className='text-white lg:text-primary text-3xl sm:text-4xl' />
            </div>
            <div className='hidden lg:block'>
               <p className="text-xs">{en ? "Call us on mobile" : "اتصل بنا علي المحمول."}</p>
               <p className="link bold hover:underline">{settings.mobile}</p>
            </div>
         </a>
         <a href={`tel:${settings.phone}`} className={`${glitter === 2 ? "glitter" : ""} lg:shadow-none hours p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 lg:border-r-2 border-gray-300`} target='_blank' rel='noreferrer' aria-label='Phone'>
            {/* <i className="fas fa-phone-rotary text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
            <div className="icon">
               <Image src="/icons/24-7.png" alt="phone" width={40} height={40} />
            </div>
            <div className='hidden lg:block'>
               <p className="text-xs">{en ? "Call us on the landline." : "اتصل بنا علي الهاتف الرضي."}</p>
               <p className="link bold hover:underline">{settings.phone}</p>
            </div>
         </a>
         <a href={`mailto:${settings.email}`} className={`${glitter === 3 ? "glitter" : ""} lg:shadow-none email bg-blue-500 p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 lg:border-r-2 border-gray-300`} target='_blank' rel='noreferrer' aria-label='Email'>
            {/* <i className="fal fa-envelope-open-text text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
            <div className="icon">
               <FontAwesomeIcon icon={faEnvelopeOpenText} className='text-white lg:text-primary text-3xl sm:text-4xl' />
            </div>
            <div className='hidden lg:block'>
               <p className="text-xs">{en ? "You can send us an e-mail." : "يمكنك مراسلتنا علي البريد الالكتروني."}</p>
               <p className="link bold hover:underline">{settings.email}</p>
            </div>
         </a>
         <a href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`} className={`${glitter === 4 ? "glitter" : ""} lg:shadow-none whats bg-green-500 p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 ${en ? "" : "lg:border-r-2 border-gray-300"}`} target='_blank' rel='noreferrer' aria-label='WhatsApp'>
            {/* <i className="fab fa-whatsapp text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
            <div className="icon">
               <FontAwesomeIcon icon={faWhatsapp} className='text-white lg:text-primary text-3xl sm:text-4xl' />
            </div>
            <div className='hidden lg:block'>
               <p className="text-xs">{en ? "Contact us via WhatsApp." : "تواصل معنا عن طرق الواتساب."}</p>
               <p className="link bold hover:underline">{settings.whatsup}</p>
            </div>
         </a>
      </div>
   )
}

const List = ({ title, items }) => {
   return (
      <div>
         <h3 className='w-fit mb-4 border-b-2 border-white text-xs md:text-base'>{title}</h3>
         <ul className='flex flex-col gap-2'>
            {items.map((item, index) => (
               <li key={index}>
                  <Link
                     target={item.blank ? "_blank" : ""}
                     className={`text-xs md:text-sm bold group text-gray-300 hover:text-primary hover:underline ${item.icon || item.arrow ? "flex gap-2 items-center" : ""}`}
                     href={item.link}
                     title={item.name}
                     aria-label={item.name}
                  >
                     {item.icon && (
                        <span className={`text-[#0a5164] bg-white rounded-full group-hover:text-white transition w-7 h-7 flex items-center justify-center
                           ${item.label == "instagram" && "group-hover:bg-purple-800"}
                           ${item.label == "twitter" && "group-hover:bg-sky-500"}
                           ${item.label == "youtube" && "group-hover:bg-red-700"}
                           ${item.label == "tiktok" && "group-hover:bg-purple-700"}
                           ${item.label == "snapchat" && "group-hover:bg-yellow-500"}
                        `}>
                           <FontAwesomeIcon icon={item.icon} />
                        </span>)}
                     {item.arrow && <FontAwesomeIcon icon={faAngleLeft} />}
                     {item.name}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default function Footer({ countries }) {
   const dispatch = useDispatch();
   const settings = useSelector((state) => state.settings.value)
   const theme = useSelector((state) => state.theme.value);
   const en = useSelector((state) => state.langs.value);
   const famousCountries = () => {
      const items = []
      for (let i = 0; i < 7; i++) {
         items.push({
            arrow: true,
            name: countries[i].name,
            link: `/our-programs/${countries[i].id}`
         })
      }
      return items
   }

   return (
      <>
         <SubFooter settings={settings} en={en} />
         <footer className=''>
            <div className="container">
               <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 py-12 md:py-16">
                  <List title={en ? "Tourist destinations" : "أشهر الوجهات السياحية"} items={famousCountries()} />
                  <List title={en ? "Follow Us" : "تابعنا علي"} items={[
                     { blank: true, label: "instagram", icon: faInstagram, name: en ? "Instagram" : "انستجرام", link: settings.instagram },
                     { blank: true, label: "twitter", icon: faTwitter, name: en ? "Twitter" : 'تويتر', link: settings.twitter },
                     { blank: true, label: "youtube", icon: faYoutube, name: en ? "Youtube" : 'يوتيوب', link: settings.youtube },
                     { blank: true, label: "tiktok", icon: faTiktok, name: en ? "Tiktok" : 'تيك توك', link: settings.tiktok },
                     { blank: true, label: "snapchat", icon: faSnapchat, name: en ? "Snapchat" : 'سناب شات', link: settings.snapchat },
                  ]} />
                  <List title={en ? "Legal" : "قانوني"} items={[
                     { name: en ? "Terms & Conditions" : 'الشروط و الأحكام', link: '/terms-and-conditions' },
                     { name: en ? "Privacy policy" : 'سياسة الخصوصية', link: '/privacy-policy' },
                  ]} />
                  <List title={en ? "Help" : "المساعدة"} items={[
                     { name: en ? "Contact us" : 'اتصل بنا', link: '/contact' },
                     { name: en ? "FAQs" : 'الأسئلة الشائعة', link: '/faq' },
                     { name: en ? "Customer thanks" : 'شكر العملاء', link: '/thanks' },
                  ]} />
                  <List title={en ? "Our Location" : "موقعنا"} items={[
                     { blank: true, name: settings.address, link: `https://www.google.com/maps/place/24%C2%B042'28.7%22N+46%C2%B037'39.0%22E/@24.707979,46.6254091,16z/data=!4m4!3m3!8m2!3d24.7079785!4d46.627512?hl=en-US` },
                  ]} />
                  <div className="col-span-2 lg:col-span-5 flex gap-8">
                  <div className="flex items-center gap-3">
                     <FontAwesomeIcon icon={faSun} className={`text-yellow-300 ${theme && " opacity-30"}`} />
                     <button
                        className={`p-[2px] w-[3rem] flex flex-col  bg-gray-200  dark:bg-gray-950 rounded-full border dark:border-gray-800`}
                        onClick={() => dispatch(setTheme(!theme))}
                        title={theme ? " المظهر الداكن" : "المظهر الفاتح"}
                     >
                        <span className={`block h-4 w-4 shadow-md rounded-full bg-gray-400 dark:bg-gray-700 transition-[margin] duration-300 ${theme ? "mr-6" : "m-0"}`}></span>
                     </button>
                     <FontAwesomeIcon icon={faMoon} className={`text-gray-200 ${!theme && "opacity-30"}`} />
                  </div>
                  <button className='underline' onClick={() => dispatch(handelLangs(!en))}>{en ? "العربية" : "English"}</button>
                  </div>
               </div>
               <div className="py-10 text-sm border-t flex flex-col md:flex-row gap-10 justify-between items-center md:items-start">
                  <Image src="/images/WTA_ALM-AR.svg" alt="logo" width={200} height={100} />
                  <div className="text-center flex flex-col items-center">
                     <Image src="/images/logo.webp" alt="logo" width={100} height={70} />
                     <p className='text-xs bold'>
                        Made with <FontAwesomeIcon icon={faHeart} className='text-red-500 text-sm' /> in Elnagah
                     </p>
                     <p className='text-xs bold'>{settings.copy_rights}</p>
                  </div>
                  <div className='flex gap-4 flex-wrap items-center'>
                     <Image src="/images/pay1.png" alt="apple pay" title='apple pay' width={40} height={30} />
                     <Image src="/images/pay2.png" alt="mastercard" title="mastercard" width={40} height={30} />
                     <Image src="/images/pay3.png" alt="visa" title='visa' width={40} height={30} />
                     <Image src="/images/pay4.png" alt="paypal" title='paypal' width={30} height={30} />
                     <Image src="/images/pay5.png" alt="mada" title='mada' width={40} height={30} />
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}
