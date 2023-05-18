import styles from './index.module.css'
import Image from 'next/image'
import Head from 'next/head'
import ScrollDown from '../../components/scrollDown'
import { useRef, useState } from 'react'
import Snackbar from '../../components/snackbar'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope, faMobile, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faTiktok, faInstagram, faTwitter, faSnapchat, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'

const Aviation = ({ slide }) => {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
  }, [])
  const settings = useSelector((state) => state.settings.value)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)
  const [snackbarMsg2, setSnackbarMsg2] = useState('')
  const snackbarRef2 = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const [formErrors2, setFormErrors2] = useState({})
  const slides = slide;
  const validate = (values) => {
    const errors = {}
    if (!values.fullname) {
      errors.fullname = 'الاسم بالكامل مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.travel_from) {
      errors.travel_from = 'حقل السفر من مطلوب'
    }
    if (!values.travel_to) {
      errors.travel_to = 'حقل السفر الي مطلوب'
    }
    if (!values.adults) {
      errors.adults = 'حقل عدد المسافرين مطلوب'
    }
    if (!values.childs) {
      errors.childs = 'حقل عدد الاطفال مطلوب'
    }
    if (!values.traveling_date) {
      errors.traveling_date = 'حقل تاريخ السفر مطلوب'
    }
    if (!values.back_date) {
      errors.back_date = 'حقل تاريخ العودة مطلوب'
    }
    return errors
  }
  const validate2 = (values) => {
    const errors = {}
    if (!values.type) {
      errors.type = 'نوع الرحلة مطلوب'
    }
    if (!values.travellers_number) {
      errors.travellers_number = 'عدد المسافرين مطلوب'
    }
    if (!values.travel_from) {
      errors.travel_from = 'حقل السفر من مطلوب'
    }
    if (!values.travel_to) {
      errors.travel_to = 'حقل السفر الي مطلوب'
    }
    if (!values.traveling_date) {
      errors.traveling_date = 'حقل تاريخ السفر مطلوب'
    }
    if (!values.back_date) {
      errors.back_date = 'حقل تاريخ العودة مطلوب'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

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
      }
      setFormErrors(validate(data))
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = 'https://backend.elnagahtravels.com/public/api/aviation'

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
        setSnackbarMsg(result?.message || result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        travel_from: event.target.travel_from.value,
        travel_to: event.target.travel_to.value,
        traveling_date: event.target.traveling_date.value,
        back_date: event.target.back_date.value,
        type: event.target.type.value,
        retreiv_taxes: event.target.retreiv_taxes.checked ? '1' : '0',
        direct_trips: event.target.direct_trips.checked ? '1' : '0',
        travellers_number: event.target.travellers_number.value,
      }
      setFormErrors2(validate2(data))
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = 'https://backend.elnagahtravels.com/public/api/aviation2'

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)

      if (Object.keys(validate2(data)).length === 0) {
        const result = await response.json()
        setSnackbarMsg2(result?.message || result)
        snackbarRef2.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }
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
        <meta property="og:url" content="https://last-delta.vercel.app/aviation" />
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
            loading='eager'
            className='object-cover'
          />
        )}
        <h1 className={styles.hero__title}>{slides[0]?.title}</h1>
        <p className={styles.hero__text}>{slides[0]?.button_text}</p>
        <ScrollDown />
      </div>
      <div className={styles.form}>
        <h2 className={styles.form__title}>
          أدخل بياناتك واستلم تذكرتك وانت بمكانك
        </h2>
        <form className={`bg-white dark:bg-gray-800 dark:text-white text-secondary ${styles.form__search}`} onSubmit={handleSubmit2}>
          <div className={`border-b dark:border-gray-700 py-8 px-4 ${styles.search__select}`}>
            <h3 className={styles.search__title}>احجز تذاكر الطيران الان</h3>
            <small style={{ color: 'red', fontSize: '.6rem' }}>
              {formErrors2?.type}
            </small>
            <div className={styles.search__content}>
              <div className={styles.select}>
                <input type='radio' value='go' id='oneway' name='type' />
                <label htmlFor='oneway'>ذهاب فقط</label>
              </div>
              <div className={styles.select}>
                <input type='radio' value='goAndBack' id='round' name='type' />
                <label htmlFor='round'>ذهاب وعودة</label>
              </div>
              <div className={styles.select}>
                <input type='radio' value='multi' id='multible' name='type' />
                <label htmlFor='multible'>وجهات متعددة</label>
              </div>
            </div>
          </div>
          <div className={`border-b dark:border-gray-700 ${styles.search__dist}`}>
            <div className={`dark:border-gray-700 ${styles.card}`}>
              <label htmlFor='travel_from' className={styles.card__title}>من</label>
              <div>
                {/* <MdLocationOn /> */}
                <input
                  type='text'
                  placeholder='بلد المسكن'
                  name='travel_from'
                  id='travel_from'
                  className={`dark:bg-gray-800 border-b dark:border-gray-700 ${styles.card__input}`}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travel_from}
              </small>
            </div>
            <div className={`dark:border-gray-700 ${styles.card}`}>
              <label htmlFor='travel_to' className={styles.card__title}>الي</label>
              <div>
                {/* <MdLocationOn /> */}
                <input
                  type='text'
                  placeholder='الوجهة'
                  name='travel_to'
                  id='travel_to'
                  className={`dark:bg-gray-800 border-b dark:border-gray-700 ${styles.card__input}`}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travel_to}
              </small>
            </div>
            <div className={`dark:border-gray-700 ${styles.card}`}>
              <label htmlFor="traveling_date" classname="{styles.card__title}">تاريخ السفر</label>
              <div>
                <input
                  type='date'
                  name='traveling_date'
                  id='traveling_date'
                  pattern='\d{2}-\d{2}-\d{4}'
                  className={`dark:bg-gray-800 border-b dark:border-gray-700 ${styles.card__input}`}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.traveling_date}
              </small>
            </div>
            <div className={`dark:border-gray-700 ${styles.card}`}>
              <label htmlFor='back_date' className={styles.card__title}>تاريخ العودة</label>
              <div>
                <input
                  type='date'
                  name='back_date'
                  id='back_date'
                  pattern='\d{2}-\d{2}-\d{4}'
                  className={`dark:bg-gray-800 border-b dark:border-gray-700 ${styles.card__input}`}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.back_date}
              </small>
            </div>
            <div className={`dark:border-gray-700 ${styles.card}`} style={{ border: 'none' }}>
              <label htmlFor='travellers_number' className={styles.card__title}>عدد المسافرين</label>
              <div>
                {/* <BsFillPeopleFill /> */}
                <input
                  type='number'
                  name='travellers_number'
                  id='travellers_number'
                  placeholder='عدد المسافرين'
                  className={`dark:bg-gray-800 border-b dark:border-gray-700 ${styles.card__input}`}
                />
              </div>
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors2?.travellers_number}
              </small>
            </div>
          </div>
          <div className={styles.search__checkbox}>
            <input type='checkbox' name='direct_trips' id='direct_trips' />
            <label htmlFor='direct_trips'>رحلات مباشرة</label>
            <input type='checkbox' name='retreiv_taxes' id='retreiv_taxes' />
            <label htmlFor='retreiv_taxes'>ضريبة الاسترجاع</label>
          </div>
          <button type='submit' className={styles.form__btn}>
            تسجيل
          </button>
        </form>
        <Snackbar ref={snackbarRef2} message={snackbarMsg2} type={'success'} />

        <div className={`bg-white dark:bg-gray-800 dark:text-white ${styles.form__data}`} id='form'>
          <form className={styles.form__content} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='firstname'>الاسم بالكامل</label>
                <input
                  type='text'
                  id='firstname'
                  name='fullname'
                  placeholder='الاسم بالكامل'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.fullname}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='phone'>رقم الجوال</label>
                <input
                  type='number'
                  id='phone'
                  name='phone'
                  placeholder='رقم الجوال'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.phone}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='passengers'>عدد البالغين</label>
                <input
                  type='number'
                  id='passengers'
                  name='adults'
                  placeholder='عدد المسافرين'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.adults}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='children'>عدد الاطفال</label>
                <input
                  type='number'
                  id='children'
                  name='childs'
                  placeholder='عدد الاطفال'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.childs}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='from'>السفر من</label>
                <input
                  type='text'
                  id='from'
                  name='travel_from'
                  placeholder='بلد المسكن'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travel_from}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='to'>السفر الي</label>
                <input
                  type='text'
                  id='to'
                  name='travel_to'
                  placeholder='الوجهة'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.travel_to}
                </small>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor='date'>تاريخ السفر</label>
                <input
                  type='date'
                  id='date'
                  name='traveling_date'
                  placeholder='تاريخ السفر'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.traveling_date}
                </small>
              </div>
              <div className={styles.field}>
                <label htmlFor='backdate'>تاريخ العودة</label>
                <input
                  type='date'
                  id='backdate'
                  name='back_date'
                  placeholder='تاريخ العودة'
                  className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
                />
                <small style={{ color: 'red', fontSize: '.6rem' }}>
                  {formErrors?.back_date}
                </small>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor='details'>تفاصيل أخري</label>
              <textarea
                id='details'
                name='notes'
                placeholder='اكتب اي تفاصيل أخري هنا...'
                rows='5'
                cols='2'
                className={`dark:bg-gray-900 dark:border-gray-700 ${styles.form__input}`}
              />
            </div>
            <button type='submit' className={styles.form__btn}>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
          <div className={styles.form__img}>
            <h3 className='main__title' id='main-title'>
              تواصل معنا عبر
            </h3>
            <div className={styles.contact__data}>
              <div className={styles.contact__data__card}>
                <h3 className={styles.contact__title}>الجوال</h3>
                <div className={styles.contact__card}>
                  <a
                    aria-label={settings.mobile}
                    href={`tel:${settings.mobile}`}
                    target='_blank'
                    rel='noreferrer'
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
                    target='_blank'
                    rel='noreferrer'
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
                    target='_blank'
                    rel='noreferrer'
                    className={styles.contact__link}
                  >
                    {settings.phone}
                  </a>
                  {/* <GiRotaryPhone /> */}
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
              </div>
              <div className={styles.contact__data__card}>
                <h3 className={styles.contact__title}>البريد الالكتروني</h3>
                <div className={styles.contact__card}>
                  <a
                    aria-label={settings.email}
                    href={`mailto:${settings.email}`}
                    target='_blank'
                    rel='noreferrer'
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
                  <FontAwesomeIcon icon={faLocationPin} style={{ height: "1rem" }} />
                  <span>{settings.address}</span>
                </div>
              </div>
            </div>
            <div className={styles.social__icons}>
              <a
                aria-label={"instagram"}
                href={settings.instagram}
                target='_blank'
                rel='noreferrer'
                className={styles.instagram}
                
              >
                {/* <BsInstagram /> */}
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                aria-label="Twitter"
                href={settings.twitter}
                target='_blank'
                rel='noreferrer'
                className={styles.twitter}
                
              >
                {/* <BsTwitter /> */}
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                aria-label="tiktok"
                href={settings.tiktok}
                target='_blank'
                rel='noreferrer'
                className={styles.tiktok}
                
              >
                {/* <FaTiktok /> */}
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a
                aria-label="snapchat"
                href={settings.snapchat}
                target='_blank'
                rel='noreferrer'
                className={styles.snapchat}
                
              >
                {/* <BsSnapchat /> */}
                <FontAwesomeIcon icon={faSnapchat} />
              </a>
              <a
                aria-label="youtube"
                href={settings.youtube}
                target='_blank'
                rel='noreferrer'
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
  )
}

export default Aviation

export async function getServerSideProps() {
  const response = await fetch('https://backend.elnagahtravels.com/public/api/slides?page=aviation')
  const
    {
      data: { slide },
    } = await response.json()
  return {
    props: {
      slide
    },
  }
}
