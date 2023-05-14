/* eslint-disable no-undef */
import styles from './index.module.css'
import Image from 'next/image'
import BtnArrow from '@/components/BtnArrow'
import Link from 'next/link'
import Head from 'next/head'
import ScrollDown from '../../../../../components/scrollDown'
import { useEffect, useRef, useState } from 'react'
import Snackbar from '../../../../../components/snackbar'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import localFont from 'next/font/local'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faLocationPin, faUserFriends, faStar, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const noto = localFont({ src: '../../../../../public/fonts/NotoNaskhArabic-Regular.ttf' })

const Responsive = ({ data }) => {
  const [popup, setPopup] = useState(null)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
        }
      }
    ]
  };
  useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [popup])
  return (
    <>
      {popup && (
        <div style={{ zIndex: "70" }} className="overlay fixed w-full h-full bg-black/50 backdrop-blur-sm top-0 left-0 flex justify-center items-center">
          <div className="card shadow-xl rounded-lg overflow-hidden bg-white dark:bg-gray-900 dark:text-white w-[90%] max-w-md">
            <div className="img relative w-full h-[15rem]">
              <Image src={popup.img} alt={popup.name} className='object-cover' fill />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className='text-xl'>{popup.name}</div>
              <p className='normel'>{popup.desc}</p>
              <button onClick={() => setPopup(null)} className="text-red-500">اغلاق</button>
            </div>
          </div>
        </div>
      )}
      <Slider {...settings}>
        {data.map((slide, index) => {
          return (
            <div key={index}>
              <div className='relative overflow-hidden rounded-lg h-[12rem] cursor-pointer mx-2' onClick={() => setPopup(slide)}>
                <Image src={slide.img} alt={slide.name} fill className='object-cover' />
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  );
};

const Accordion = ({ title, text, index }) => {
  const [isActive, setIsActive] = useState(index === 0 ? true : false);
  return (
    <div className="relative accordion">
      <div className="absolute top-[1rem] border-4 bg-gray-50 dark:bg-gray-800 p-[2px] border-primary right-[1px] translate-x-1/2 w-6 h-6 rounded-full">
        {isActive && <div className="w-full h-full rounded-full bg-primary"></div>}
      </div>
      <div className={`border-r-4 border-primary pr-4 transition-all duration-500 delay-0 ${isActive ? "max-h-[500px]" : "max-h-[55px]"} overflow-hidden`}>
        <div className='text-primary flex my-4 justify-between items-center' onClick={() => setIsActive(!isActive)}>
          {title}
          {/* <i className={`far fa-angle-up text-xl text-primary transition ${isActive ? "rotate-180" : "rotate-0"}`}></i> */}
          <FontAwesomeIcon icon={faAngleUp} className={`text-xl text-primary transition ${isActive ? "rotate-180" : "rotate-0"}`} />
        </div>
        <p className={`text-xs md:text-sm mb-4`}>{text}</p>
      </div>
    </div>
  );
};

const Details = (props) => {
  const settings = useSelector((state) => state.settings.value)
  const program = props.program
  const programs = props.programs
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)
  const dateRef = useRef(null)
  // const date = useRef(null)
  const [activeTap, setActiveTap] = useState(0)
  const [date, setDate] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const regex = /^\S+@\S+\.\S+$/
  const slides = [
    {
      img: "https://backend.elnagahtravels.com/storage/countries/3sy8eqcWx46s7QtEcafLPesHfSFiJdOtPjaitwsr.png",
      name: "مكان",
      desc: "يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن "
    },
    {
      img: "https://backend.elnagahtravels.com/storage/countries/VDHSwd11Kov6I5ZqcAfrptFR5vrl6WPN0a0n6ldb.jpg",
      name: "مكان",
      desc: "يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن "
    }, {
      img: "https://backend.elnagahtravels.com/storage/countries/qC3vI4nVvOEZx7h76w3w0A2IfIW7tnBlr7I7mxlt.jpg",
      name: "مكان",
      desc: "يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن "
    }
  ]


  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'الاسم مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الالكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    if (!values.travling_distnation) {
      errors.travling_distnation = 'حقل السفر الي مطلوب'
    }
    if (!values.ppl_number) {
      errors.ppl_number = 'حقل عدد المسافرين مطلوب'
    }
    if (!values.childs_number) {
      errors.childs_number = 'حقل عدد الاطفال مطلوب'
    }
    if (!values.travling_date) {
      errors.travling_date = 'حقل تاريخ السفر مطلوب'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        travling_date: event.target.travling_date.value,
        travling_distnation: event.target.travling_distnation.value,
        ppl_number: event.target.ppl_number.value,
        childs_number: event.target.childs_number.value,
        phone: event.target.phone.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = `https://backend.elnagahtravels.com/public/api/programs/${program.id}/reserve`

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      if (Object.keys(validate(data)).length === 0) {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setSnackbarMsg(result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const message = (id) => {
    const program = programs?.find((p) => p?.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price_after_discount}`
  }
  const handleDate = () => {
    dateRef.current.showPicker()
  }
  return (
    <>
      <Head>
        <title>
          {`${program.category?.name} - ${program.country?.name}`}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={settings.meta_description}
        />
        <meta property="og:title" content={settings.meta_title} />
        <meta property="og:url" content="https://last-delta.vercel.app/our-programs" />
        <meta name="keywords" content={settings.keywords} />
        <meta
          property="og:description"
          content={settings.meta_description}
        />
        <meta name="twitter:title" content={settings.meta_title} />
        <meta
          name="twitter:description"
          content={settings.meta_description}
        />
      </Head>
      <div className='bg-gray-50 dark:bg-gray-900'>
        <div className={styles.details__bg}>
          <Image src={program?.image} alt={program.title} fill />
          <div className={styles.content}>
            <h1>
              {program.category?.name} - {program.country?.name}
            </h1>
            {/* {program.image.map((img, i) => {
              return ( */}
            <div className="item cursor-pointer relative w-48 h-32 rounded-lg overflow-hidden">
              <Image src={program.image} alt={program.title} fill />
            </div>
            {/* )
            })} */}
          </div>
          <Link href={"/our-programs"} className='rounded-full px-4 py-2 text-xs bg-white dark:bg-gray-900 dark:text-white z-10 absolute bottom-4 block md:hidden right-4 bold'>عودة إلى الباقات</Link>
          <ScrollDown />
        </div>
        <div className="md:hidden sticky bg-white dark:bg-gray-950 mb-4 shadow-md text-xs z-30 top-[6rem] left-0 w-full flex gap-5 p-2">
          <Link href={"#slider"} className={`py-2 px-3 text-primary rounded-full ${noto.className} ${activeTap == 1 ? "border border-primary bg-primary/25" : "border-none bg-transparent"}`} onClick={() => setActiveTap(1)}>وجهات يمكنك زيارتها</Link>
          <Link href={"#line"} className={`py-2 px-3 text-primary rounded-full ${noto.className} ${activeTap == 2 ? "border border-primary bg-primary/25" : "border-none bg-transparent"}`} onClick={() => setActiveTap(2)}>خط سير الرحلة</Link>
          <Link href={"#form"} className={`py-2 px-3 text-primary rounded-full ${noto.className} ${activeTap == 3 ? "border border-primary bg-primary/25" : "border-none bg-transparent"}`} onClick={() => setActiveTap(3)}>يرجى التواصل معي</Link>
        </div>
        <div className={`${styles.details} grid grid-cols-3`}>
          <div className={`${styles.details__info} col-span-3 lg:col-span-2`}>
            <div className="hidden md:block border-b dark:border-gray-600">
              <Breadcrumbs list={[{ title: 'البرامج السياحية', href: "/our-programs" }, { title: program.country.name, href: `/our-programs/${program.country.id}` }, { title: program.category.name, href: null }]} />
            </div>
            <p className={`text-justify dark:text-gray-100 ${noto.className}`}>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.</p>
            <h2 id='slider' className={`text-secondary dark:text-white border-b-2 border-secondary dark:border-white ${styles.details__details}`}>وجهات يمكنك زيارتها</h2>
            <Responsive data={slides} />
            <div id="line" />
            <div className="border dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col gap-4 rounded-b-lg">
              <div className={styles.details__details}>
                <h3 className='text-xl mb-6'>
                  خط سير الرحلة
                </h3>
                <div className={styles.details__days + " " + noto.className}>
                  {program.program_days?.map((day, i) => (
                    <div className="grid grid-cols-9 md:grid-cols-7" key={i}>
                      <div className="col-span-2 md:col-span-1 max-h-[55px]">
                        <div className='text-xs md:text-sm font-light flex justify-between w-full p-4 pr-0'>
                          {day?.name}
                        </div>
                      </div>
                      <div className="col-span-7 md:col-span-6">
                        <Accordion title="الوصول إلى بانكوك" text={day.content} index={i} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.details__details}>
                <h3 className='text-xl mb-6'>
                  الرحلة تشمل:
                </h3>
                <div className={styles.details__days + " " + noto.className}>
                  {program.includes?.map((item, i) => (
                    <div className="grid grid-cols-9 md:grid-cols-7" key={i}>
                      <div className="col-span-2 md:col-span-1 max-h-[55px]">
                        <div className='text-xs md:text-sm font-light flex justify-between w-full p-4 pr-0'>

                        </div>
                      </div>
                      <div className="col-span-7 md:col-span-6">
                        <Accordion title={"الرحلة تشمل:"} text={item} index={i} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.details__details}>
                <h3 className='text-xl mb-6'>
                  الرحلة لا تشمل:
                </h3>
                <div className={styles.details__days + " " + noto.className}>
                  {program.exculdes?.map((item, i) => (
                    <div className="grid grid-cols-9 md:grid-cols-7" key={i}>
                      <div className="col-span-2 md:col-span-1 max-h-[55px]">
                        <div className='text-xs md:text-sm font-light flex justify-between w-full p-4 pr-0'>

                        </div>
                      </div>
                      <div className="col-span-7 md:col-span-6">
                        <Accordion title={"الرحلة لا تشمل:"} text={item} index={i} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${noto.className} p-4 border-t dark:border-gray-700`}>
                <p className="text-gray-400">استمتع بالتخطيط لرحلتك كيفما شئت مع باقات العطلات المخصصة لشخص واحد</p>
                <div id='form'>من <span className='text-xl font-bold'>{program.price_after_discount} SAR</span></div>
              </div>
            </div>
          </div>
          <div className={`${styles.details__form} border dark:border-gray-700 dark:text-white col-span-3 lg:col-span-1 dark:bg-gray-800 bg-white`}>
            {/* <div className={styles.details__form__card}>
              <h3>السعر</h3>
              <div className={styles.details__card__price}>
                <div>
                  <span className={styles.new__price}>
                    {program.price_after_discount}
                  </span>
                  ريال سعودي
                </div>
                <div>
                  بدلا من
                  <span className={styles.old__price}>{program.price}</span>
                </div>
              </div>
            </div> */}
            <Link className="w-full rounded-full shadow-md bg-green-600 text-white p-4 flex gap-4 items-center justify-center" href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`} target='_blank' rel='noreferrer'>
              {/* <i className="fab fa-whatsapp text-2xl"></i> */}
              <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
              <span>تواصل معنا عن طريق الوتساب</span>
            </Link>
            <div className="relative w-full my-4">
              <span className='bg-white dark:bg-gray-800 p-4 text-gray-600 dark:text-gray-400 text-xs z-10 relative'>أو</span>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-[75%] bg-gray-200 dark:bg-gray-700"></span>
            </div>
            <form
              className={`${styles.details__form__cards} ${noto.className}`}
              onSubmit={handleSubmit}
            >
              <div className={styles.details__form__card}>
                <label htmlFor='name'>الاسم</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='الاسم'
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.name}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='email'>البريد الالكتروني</label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='البريد الالكتروني'
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.email}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='phone'>رقم الجوال</label>
                <input
                  type='number'
                  id='phone'
                  name='phone'
                  placeholder='رقم الجوال'
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.phone}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='travling_date'>تاريخ السفر</label>
                <input
                  type="date"
                  id='travling_date'
                  name='travling_date'
                  className='absolute'
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: '0', height: '0', zIndex: '-1' }}
                  ref={dateRef}
                />
                <input
                  type="text"
                  onFocus={handleDate}
                  onClick={handleDate}
                  placeholder={new Date().toLocaleDateString()}
                  value={date}
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travling_date}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='travling_distnation'>جهة السفر</label>
                <input
                  type='text'
                  id='travling_distnation'
                  name='travling_distnation'
                  placeholder='جهة السفر'
                  className="dark:bg-gray-900 dark:border-gray-700"

                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travling_distnation}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='ppl_number'>عدد الاشخاص</label>
                <input
                  type='number'
                  id='ppl_number'
                  name='ppl_number'
                  placeholder='عدد الاشخاص'
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.ppl_number}
                </small>
              </div>
              <div className={styles.details__form__card}>
                <label htmlFor='childs_number'>عدد الاطفال</label>
                <input
                  type='number'
                  id='childs_number'
                  name='childs_number'
                  placeholder='عدد الاطفال'
                  className="dark:bg-gray-900 dark:border-gray-700"
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.childs_number}
                </small>
              </div>
              <button className={styles.form__btn} type='submit'>
                ارسال
              </button>
            </form>
            <Snackbar
              ref={snackbarRef}
              message={snackbarMsg}
              type={'success'}
            />
          </div>
        </div>
        {programs?.filter((prog) => prog?.id !== program.id).length > 0 && (
          <div className={styles.similar}>
            <h2 className='dark:text-white'>برامج مشابهة</h2>
            <div className={styles.similar__cards}>
              {programs
                ?.filter((prog) => prog?.id !== program.id)
                .slice(0, 3)
                .map((prog) => (
                  <div className={`dark:bg-gray-800 dark:text-white ${styles.similar__card}`} key={prog?.id}>
                    <div className={styles.similar__card__container}>
                      <div className={styles.similar__img__container}>
                        {prog?.image && (
                          <Image
                            src={prog?.image}
                            alt={prog?.title}
                            fill
                            className={styles.similar__card__img}
                          />
                        )}
                      </div>
                      <div className={styles.similar__card__content}>
                        <div className={styles.similar__card__period}>
                          <span>
                            {/* <i className="fas fa-sun"></i> */}
                            <FontAwesomeIcon icon={faSun} />
                            {program.days} أيام
                          </span>
                          <span>
                            {/* <i className="fas fa-moon"></i> */}
                            <FontAwesomeIcon icon={faMoon} />
                            {program.nights} ليالي
                          </span>
                          <span>
                            {/* <i className="fas fa-map-marker-alt"></i> */}
                            <FontAwesomeIcon icon={faLocationPin} />
                            {program.country.name}
                          </span>
                          {program.people && (
                            <span>
                              {/* <i className="fas fa-user-friends"></i> */}
                              <FontAwesomeIcon icon={faUserFriends} />
                              {program.people}
                            </span>
                          )}
                        </div>
                        <div className={styles.similar__heading}>
                          <Link
                            href={`/our-programs/${prog?.country?.id}/${prog?.category?.id}/${prog?.id}`}
                          >
                            <h3 className="text-secondary dark:text-white my-4 text-xl">
                              {prog?.title} {prog?.rate} نجوم
                            </h3>
                          </Link>
                          <div className={styles.stars}>
                            {Array.from(Array(prog.rate)).map((s, i) => (
                              // <i className="fas fa-star text-yellow-400" key={i}></i>
                              <FontAwesomeIcon icon={faStar} key={i} className='text-yellow-400' />
                            ))}
                          </div>
                        </div>
                        <div className={styles.similar__card__price}>
                          <div>
                            <span className={"text-secondary dark:text-white text-xl bold"}>
                              {prog?.price_after_discount}
                            </span>{' '}
                            ريال سعودي
                          </div>
                          <div>
                            بدلا من
                            <span className={styles.old__price}>
                              {prog?.price}
                            </span>
                          </div>
                        </div>
                        <div className={styles.similar__card__btns}>
                          <BtnArrow
                            title='تفاصيل العرض'
                            href={`/our-programs/${prog?.country?.id}/${prog?.category?.id}/${prog?.id}`}
                          />
                          <BtnArrow
                            title='حجز العرض'
                            href={`https://api.whatsapp.com/send?phone=${settings.whatsup
                              }&${message(prog?.id)}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Details

export const getServerSideProps = async (context) => {
  const place = context.params.place
  const categoryId = context.params.categoryId
  const detailsId = context.params.details
  try {
    if (place && categoryId && detailsId) {
      const [response, progRes] = await Promise.all([
        fetch(
          `https://backend.elnagahtravels.com/public/api/programs_details/${detailsId}`
        ),
        fetch(
          `https://backend.elnagahtravels.com/public/api/programs?country_id=${place}&category_id=${categoryId}`
        ),
      ])
      if (response.status !== 200)
        return {
          notFound: true,
        }
      const [{ program = {} }, { programs = [] }] =
        await Promise.all([
          response.json(),
          progRes.json(),
        ])

      return {
        props: {
          program,
          programs
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}