import styles from './index.module.css'
import FullPageSlider from '../../components/fullPageSlider'
import Head from 'next/head'
import Hotels from '../../components/hotels'
import { useRef, useState } from 'react'
import Snackbar from '../../components/snackbar'
import { useSelector } from 'react-redux'

const BookHotel = ({ hotels, slide }) => {
  const settings = useSelector((state) => state.settings.value)
  const [formErrors, setFormErrors] = useState({})
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const regex = /^\S+@\S+\.\S+$/
  const snackbarRef = useRef(null)

  const validate = (values) => {
    const errors = {}
    if (!values.fullname) {
      errors.fullname = 'الأسم بالكامل مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الألكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.hotel_name) {
      errors.hotel_name = 'اسم الفندق مطلوب'
    }
    if (!values.destination) {
      errors.destination = 'الوجهة مطلوبة'
    }
    return errors
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        email: event.target.email.value,
        phone: event.target.phone.value,
        fullname: event.target.fullname.value,
        destination: event.target.destination.value,
        hotel_name: event.target.hotel_name.value,
        details: event.target.details.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint =
        'https://backend.elnagahtravels.com/public/api/hotel_reservations'

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
  return (
    <>
      <Head>
        <title>حجز فندق</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta property="og:title" content="حجز فندق" />
        <meta property="og:url" content="https://last-delta.vercel.app/book-hotel" />
        <meta name="keywords" content={settings?.keywords} />
        <meta
          property="og:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta name="twitter:title" content="حجز فندق" />
        <meta
          name="twitter:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
      </Head>
      <FullPageSlider
        data={slide}
        title={slide[0]?.title}
        btnText={slide[0]?.button_text}
        btnUrl={'#hotels'}
      />
      <Hotels hotels={hotels} settings={settings} />
      <div className='spikes'></div>
      <div className={styles.form} id='form'>
        <div className={styles.form__bg}></div>
        <div className={styles.form__data}>
          <form className={styles.form__content} onSubmit={handleSubmit}>
            <div className={styles.full__name}>
              <label htmlFor='name'>الاسم بالكامل</label>
              <input
                type='text'
                id='name'
                name='fullname'
                placeholder='الاسم بالكامل'
                style={
                  formErrors?.fullname
                    ? { borderBottom: '2px solid red' }
                    : { borderBottom: '2px solid lightgray' }
                }
              />
            </div>
            <div className={styles.phone}>
              <label htmlFor='phone'>رقم الجوال</label>
              <input
                type='number'
                id='phone'
                name='phone'
                placeholder='رقم الجوال'
                style={
                  formErrors?.phone
                    ? { borderBottom: '2px solid red' }
                    : { borderBottom: '2px solid lightgray' }
                }
              />
            </div>
            <div className='email'>
              <label htmlFor='email'>البريد الالكتروني</label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='البريد الالكتروني'
                style={
                  formErrors?.email
                    ? { borderBottom: '2px solid red' }
                    : { borderBottom: '2px solid lightgray' }
                }
              />
            </div>
            <div className='hotel'>
              <label htmlFor='hotel'>اسم الفندق المطلوب</label>
              <input
                type='text'
                id='hotel'
                name='hotel_name'
                placeholder='اسم الفندق المطلوب'
                style={
                  formErrors?.hotel_name
                    ? { borderBottom: '2px solid red' }
                    : { borderBottom: '2px solid lightgray' }
                }
              />
            </div>
            <div className='dist'>
              <label htmlFor='dist'>الوجهة المطلوبة</label>
              <input
                type='text'
                id='dist'
                name='destination'
                placeholder='الوجهة المطلوبة'
                style={
                  formErrors?.destination
                    ? { borderBottom: '2px solid red' }
                    : { borderBottom: '2px solid lightgray' }
                }
              />
            </div>
            <div className={styles.message}>
              <label htmlFor='message'>تفاصيل اخري</label>
              <textarea
                id='message'
                name='details'
                placeholder='تفاصيل اخري'
                rows='5'
              />
            </div>
            <button type='submit' className={styles.form__btn}>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
        </div>
      </div>
    </>
  )
}

export default BookHotel


export async function getServerSideProps() {
  const [hotelsRes, slideRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/hotels'),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=hotels'),
  ])
  const [
    { hotels = [] },
    {
      data: { slide = [] },
    },
  ] = await Promise.all([
    hotelsRes.json(),
    slideRes.json(),
  ])
  return {
    props: {
      hotels,
      slide,
    },
  }
}
