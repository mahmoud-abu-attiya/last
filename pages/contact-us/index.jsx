import styles from './index.module.css'
import BtnArrow from '@/components/BtnArrow'
import Image from 'next/image'
import Head from 'next/head'
import ScrollDown from '../../components/scrollDown'
import { useRef, useState } from 'react'
import Snackbar from '../../components/snackbar'
import { useSelector } from 'react-redux'

const ContactUs = ({ slide }) => {
  const settings = useSelector((state) => state.settings.value)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const regex = /^\S+@\S+\.\S+$/
  const snackbarRef = useRef(null)

  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'الأسم بالكامل مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الألكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.message) {
      errors.message = 'الرسالة مطلوبة'
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
        phone: event.target.phone.value,
        message: event.target.message.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint =
        'https://backend.elnagahtravels.com/public/api/contact_us'

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
        <meta property="og:url" content="https://last-delta.vercel.app/contact-us" />
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
      <div className={`text-white ${styles.hero__bg}`}>
        {slide[0].image && (
          <Image
            src={slide[0].image}
            alt={slide[0].button_text}
            fill
          />
        )}
        <h1>{slide[0].title}</h1>
        <BtnArrow
          title={slide[0].button_text}
          href={'#form'}
        />
        <ScrollDown />
      </div>
      <div className={styles.form} id='form'>
        <div className={styles.form__bg}></div>
        <h2>سنكون سعيدين باستلام رسالتك</h2>
        <div className={styles.form__data}>
          <form
            className={styles.form__content}
            onSubmit={handleSubmit}
            id='myForm'
          >
            <div className={styles.full__name}>
              <label htmlFor='name'>الاسم بالكامل</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='الاسم بالكامل'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.name}
              </small>
            </div>
            <div className={styles.phone}>
              <label htmlFor='phone'>رقم الجوال</label>
              <input
                type='number'
                id='phone'
                name='phone'
                placeholder='رقم الجوال'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.phone}
              </small>
            </div>
            <div className='email'>
              <label htmlFor='email'>البريد الالكتروني</label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='البريد الالكتروني'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.email}
              </small>
            </div>
            <div className={styles.message}>
              <label htmlFor='message'>الرسالة</label>
              <textarea
                id='message'
                name='message'
                placeholder='الرسالة'
                rows='5'
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.message}
              </small>
            </div>
            <button type='submit' className={styles.form__btn}>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
          <div className={styles.form__img}>
            <div className={styles.form__img__content}>
              <h3 className='main__title my-4'>هيا نتواصل</h3>
              <div className={styles.contact__data}>
                <div className={`${styles.contact__data__card}`}>
                  <h3 className='my-4'>الجوال</h3>
                  <div className={styles.phone}>
                    <div>
                      <a
                        href={`tel:${settings.mobile}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {settings.mobile}
                      </a>
                      <i className="fas fa-mobile text-primary"></i>
                    </div>
                    <div>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {settings.whatsup}
                      </a>
                      <i className="fab fa-whatsapp text-primary"></i>
                    </div>
                    <div>
                      <a
                        href={`tel:${settings.phone}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {settings.phone}
                      </a>
                      <i className="fas fa-phone-rotary text-primary"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.contact__data__card}>
                  <h3 className='my-4'>البريد الالكتروني</h3>
                  <div>
                    <a
                      href={`mailto:${settings.email}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {settings.email}
                    </a>
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                </div>
                <div className={styles.contact__data__card}>
                  <h3 className='my-4'>العنوان</h3>
                  <div>
                    <div>{settings.address}</div>
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                </div>
              </div>
              <div className={styles.social__icons}>
                <a
                  href={settings.instagram}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.instagram}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={settings.twitter}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.twitter}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={settings.tiktok}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.tiktok}
                >
                  <i className="fab fa-tiktok"></i>
                </a>
                <a
                  href={settings.snapchat}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.snapchat}
                >
                  <i className="fab fa-snapchat-ghost"></i>
                </a>
                <a
                  href={settings.youtube}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.youtube}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map */}
      <div className={styles.contact__map}>
        {settings.latitude && settings.longitude && (
          <iframe
            src={`https://maps.google.com/maps?q=${settings.latitude},${settings.longitude}&zoom=15&hl=es;&output=embed`}
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            allowFullScreen=''
            loading='lazy'
            title='saudi arabia map'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        )}
      </div>
    </>
  )
}

export default ContactUs


export async function getServerSideProps() {
  const slidersRes = await fetch('https://backend.elnagahtravels.com/public/api/slides?page=contact_us')

  const 
    {
      data: { slide = [] },
    }
   = await slidersRes.json()

  return { props: { slide } };
}