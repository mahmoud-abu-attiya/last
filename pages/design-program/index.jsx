/* eslint-disable no-undef */
import Head from 'next/head'
import styles from './index.module.css'
import Image from 'next/image'
import Breadcrumbs from '../../components/Breadcrumbs'
// import ScrollDown from '../../components/scrollDown'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect } from 'react'
import Snackbar from '../../components/snackbar'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faMobile, faEnvelope, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faInstagram, faTwitter, faTiktok, faYoutube, faSnapchatSquare } from '@fortawesome/free-brands-svg-icons'
import { setBacktoData } from '@/slices/backto'

const DesignProgram = ({ data, slide }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ href: '/', title: en ? 'Home' : 'الرئيسية' }))
  }, [])
  const settings = useSelector((state) => state.settings.value)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [formErros, setFormErrors] = useState({})
  const snackbarRef = useRef(null)
  const regex = /^\S+@\S+\.\S+$/
  const validate = (values) => {
    const errors = {}
    if (!values.first_name) {
      errors.first_name = 'الاسم الاول مطلوب'
    }
    if (!values.family_name) {
      errors.family_name = 'اسم العائلة مطلوب'
    }
    if (!values.phone) {
      errors.phone = 'رقم الهاتف مطلوب'
    }
    if (!values.email) {
      errors.email = 'البريد الالكتروني مطلوب'
    } else if (!regex.test(values.email)) {
      errors.email = 'البريد الالكتروني غير صالح'
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
    if (!values.travel_need) {
      errors.travel_need = 'حقل متطلبات السفر مطلوب'
    }
    return errors
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Get data from the form.
      const data = {
        first_name: event.target.first_name.value,
        family_name: event.target.family_name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        travel_from: event.target.travel_from.value,
        travel_to: event.target.travel_to.value,
        traveling_date: event.target.traveling_date.value,
        childs: event.target.childs.value,
        adults: event.target.adults.value,
        travel_need: event.target.travel_need.value,
        notes: event.target.notes.value,
      }
      setFormErrors(validate(data))

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint =
        'https://backend.elnagahtravels.com/public/api/design_program/order'

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

  // const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta property="og:title" content={data.title} />
        <meta property="og:url" content="https://last-delta.vercel.app/design-program" />
        <meta name="keywords" content={settings.keywords} />
        <meta
          property="og:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
        <meta name="twitter:title" content={data.title} />
        <meta
          name="twitter:description"
          content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
        />
      </Head>
      {slide[0]?.image && (
        <>
          <div
            className={styles.bg}
            
          >
            <div className={styles.hero__bg} style={{ backgroundImage: `url(${slide[0]?.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
              <div className="absolute w-full h-full bg-black/50"></div>
              <div className="container relative">
                <form className='text-black dark:text-white flex flex-col md:flex-row w-full max-w-5xl mx-auto'>
                <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 grow rounded-t-xl md:rounded-tl-none md:rounded-r-xl">
                  <label htmlFor="category" className='text-gray-600 dark:text-gray-400 text-xs'>رحلة مناسبة ل</label>
                  <select
                    name="category"
                    id="category"
                    className="w-full outline-none bg-white dark:bg-gray-900"
                  >
                    <option value="honeymoon">شهر العسل</option>
                    <option value="family">العائلة</option>
                    <option value="friends">الأصدقاء</option>
                    <option value="solo">منفرد</option>
                  </select>
                </div>
                <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 grow">
                  <label htmlFor="date" className='text-gray-600 dark:text-gray-400 text-xs'>التاريخ</label>
                  <select
                    name="date"
                    id="date"
                    className="w-full outline-none bg-white dark:bg-gray-900"
                  >
                    <option value="honeymoon">شهر العسل</option>
                    <option value="family">العائلة</option>
                    <option value="friends">الأصدقاء</option>
                    <option value="solo">منفرد</option>
                  </select>
                </div>
                <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 grow">
                  <label htmlFor="date" className='text-gray-600 dark:text-gray-400 text-xs'>مدة الباقة (اختياري)</label>
                  <select
                    name="date"
                    id="date"
                    className="w-full outline-none bg-white dark:bg-gray-900"
                  >
                    <option value="honeymoon">الكل</option>
                    <option value="family"> ويكند سريع <span className="text-xs">(حتى 3 ليالي)</span></option>
                    <option value="family">  باقة طويلة   <span className="text-xs">(4 ليالي فآكثر)</span></option>
                  </select>
                </div>
                <button type="submit" className='bg-yellow-600 text-white px-6 text-3xl py-4 rounded-b-xl md:rounded-br-none md:rounded-l-xl'>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              </div>
            </div>
                <div className="bg-gray-100 dark:bg-gray-900">
                  <div className="container hidden md:block">
                  <Breadcrumbs list={[{ title: data?.subtitle }]} />
                </div>
                </div>
            <div className={`dark:text-white ${styles.card}`}>
              <div className={styles.card__container}>
                <div className={styles.card__content}>
                  <h2>{data?.subtitle}</h2>
                  <div className='flex items-center'>
                    {data?.content}
                    {data?.icon && (
                      <Image
                        src={data?.icon}
                        width={55}
                        height={57}
                        alt='social media icon'
                      />
                    )}
                  </div>
                  {data?.image && (
                    <a
                      aria-label='twitter'
                      href={data.social_link}
                      className={styles.card__content__img}
                    >
                      <Image src={data?.image} alt='card' fill />
                    </a>
                  )}
                  <p>
                    تابعو حسابنا في تويتر شركة وسام النجاح{' '}
                    <a
                      aria-label='twitter' href={data?.social_link}>{data?.social_text}</a>{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.form} id='form'>
              {/* <div className={styles.form__bg}></div> */}
              <h2 className='dark:text-white'>صمم برنامجك بطريقتك</h2>
              <div className={`bg-white dark:bg-gray-800 dark:text-white ${styles.form__data}`} >
                <form className={styles.form__content} onSubmit={handleSubmit}>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor='firstname'>الاسم الاول</label>
                      <input
                        type='text'
                        id='firstname'
                        name='first_name'
                        placeholder='الاسم الاول'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.first_name}
                      </small>
                    </div>
                    <div>
                      <label htmlFor='lastname'>اسم العائلة</label>
                      <input
                        type='text'
                        id='lastname'
                        name='family_name'
                        placeholder='اسم العائلة'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.family_name}
                      </small>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor='phone'>رقم الجوال</label>
                      <input
                        type='number'
                        id='phone'
                        name='phone'
                        placeholder='رقم الجوال'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.phone}
                      </small>
                    </div>
                    <div>
                      <label htmlFor='email'>البريد الالكتروني</label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='البريد الالكتروني'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.email}
                      </small>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor='from'>السفر من</label>
                      <input
                        type='text'
                        id='from'
                        name='travel_from'
                        placeholder='بلد المسكن'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.travel_from}
                      </small>
                    </div>
                    <div>
                      <label htmlFor='to'>السفر الي</label>
                      <input
                        type='text'
                        id='to'
                        name='travel_to'
                        placeholder='الوجهة'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.travel_to}
                      </small>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor='passengers'>عدد المسافرين</label>
                      <input
                        type='number'
                        id='passengers'
                        name='adults'
                        placeholder='عدد المسافرين'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.adults}
                      </small>
                    </div>
                    <div>
                      <label htmlFor='children'>عدد الاطفال</label>
                      <input
                        type='number'
                        id='children'
                        name='childs'
                        placeholder='عدد الاطفال'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.childs}
                      </small>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor='date'>تاريخ السفر</label>
                      <input
                        type='date'
                        id='date'
                        name='traveling_date'
                        placeholder='تاريخ السفر'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.traveling_date}
                      </small>
                    </div>
                    <div>
                      <label htmlFor='needs'>متطلبات السفر</label>
                      <input
                        type='text'
                        id='needs'
                        name='travel_need'
                        placeholder='متطلبات السفر'
                        className="dark:bg-gray-900 dark:border-gray-700"
                      />
                      <small style={{ color: 'red', fontSize: '.6rem' }}>
                        {formErros?.travel_need}
                      </small>
                    </div>
                  </div>
                  <div className={styles.message}>
                    <label htmlFor='details'>تفاصيل أخري</label>
                    <textarea
                      id='details'
                      name='notes'
                      placeholder='اكتب اي تفاصيل أخري هنا...'
                      className="dark:bg-gray-900 dark:border-gray-700"
                      rows='5'
                      cols='2'
                    />
                  </div>
                  <button type='submit' className={styles.form__btn}>
                    ارسال
                  </button>
                </form>
                <Snackbar
                  ref={snackbarRef}
                  message={snackbarMsg}
                  type={'success'}
                />
                <div className={styles.form__img}>
                  <div className={styles.form__img__content}>
                    <h3 className='main__title my-4'>هيا نتواصل</h3>
                    <div className={styles.contact__data}>
                      <div className={`${styles.contact__data__card}`}>
                        <h3 className='my-4'>الجوال</h3>
                        <div className={styles.phone}>
                          <div>
                            <a
                              aria-label='twitter'
                              href={`tel:${settings.mobile}`}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {settings.mobile}
                            </a>
                            {/* <i className="fas fa-mobile text-primary"></i> */}
                            <FontAwesomeIcon icon={faMobile} className='text-primary h-4' style={{ height: "1rem" }} />
                          </div>
                          <div>
                            <a
                              aria-label='twitter'
                              href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {settings.whatsup}
                            </a>
                            {/* <i className="fab fa-whatsapp text-primary"></i> */}
                            <FontAwesomeIcon icon={faWhatsapp} className='text-primary h-4' style={{ height: "1rem" }} />
                          </div>
                          <div>
                            <a
                              aria-label='phone'
                              href={`tel:${settings.phone}`}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {settings.phone}
                            </a>
                            {/* <i className="fas fa-phone-rotary text-primary"></i> */}
                            <FontAwesomeIcon icon={faPhoneAlt} className='text-primary h-4' style={{ height: "1rem" }} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.contact__data__card}>
                        <h3 className='my-4'>البريد الالكتروني</h3>
                        <div>
                          <a
                            aria-label='email'
                            href={`mailto:${settings.email}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {settings.email}
                          </a>
                          {/* <i className="fas fa-envelope text-primary"></i> */}
                          <FontAwesomeIcon icon={faEnvelope} className='text-primary h-4' style={{ height: "1rem" }} />
                        </div>
                      </div>
                      <div className={styles.contact__data__card}>
                        <h3 className='my-4'>العنوان</h3>
                        <div>
                          <div>{settings.address}</div>
                          {/* <i className="fas fa-map-marker-alt text-primary"></i> */}
                          <FontAwesomeIcon icon={faLocationPin} className='text-primary h-4' style={{ height: "1rem" }} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.social__icons}>
                      <a
                        aria-label='instagram'
                        href={settings.instagram}
                        target='_blank'
                        rel='noreferrer'
                        className={"group"}
                      >
                        <div className="absolute w-full h-full transition duration-500 translate-y-full group-hover:translate-y-0" style={{ backgroundImage: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)" }} ></div>
                        <FontAwesomeIcon icon={faInstagram} className='transition duration-500' />
                      </a>
                      <a
                        aria-label='twitter'
                        href={settings.twitter}
                        target='_blank'
                        rel='noreferrer'
                        className={"group"}
                      >
                        <div className="absolute w-full h-full transition duration-500 translate-y-full group-hover:translate-y-0 bg-[#1DA1F2]"></div>
                        {/* <i className="fab fa-twitter"></i> */}
                        <FontAwesomeIcon icon={faTwitter}  className='transition duration-500' />
                      </a>
                      <a
                        aria-label='tiktok'
                        href={settings.tiktok}
                        target='_blank'
                        rel='noreferrer'
                        className={"group"}
                      >
                        <div className="absolute w-full h-full transition duration-500 translate-y-full group-hover:translate-y-0" style={{ backgroundImage: "linear-gradient(45deg, #ff0050, #00f2ea)" }} ></div>
                        {/* <i className="fab fa-tiktok"></i> */}
                        <FontAwesomeIcon icon={faTiktok} className='transition duration-500' />
                      </a>
                      <a
                        aria-label='snapchat'
                        href={settings.snapchat}
                        target='_blank'
                        rel='noreferrer'
                        className={"group"}
                      >
                        {/* <i className="fab fa-snapchat-ghost"></i> */}
                      <div className="absolute w-full h-full transition duration-500 translate-y-full group-hover:translate-y-0 bg-[#FFFC00]"></div>
                        <FontAwesomeIcon icon={faSnapchatSquare} className='transition duration-500' />
                      </a>
                      <a
                        aria-label='youtube'
                        href={settings.youtube}
                        target='_blank'
                        rel='noreferrer'
                        className={"group"}
                      >
                        <div className="absolute w-full h-full transition duration-500 translate-y-full group-hover:translate-y-0 bg-[#FF0000]"></div>
                        {/* <i className="fab fa-youtube"></i> */}
                        <FontAwesomeIcon icon={faYoutube} className='transition duration-500' />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DesignProgram

export async function getServerSideProps() {
  const [mainRes, programsRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/design_program').then(res => res.json()),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=design-program').then(res => res.json()),
  ]);
  const [
    { hotels: data = {} },
    {
      data: { slide = [] },
    },
  ] = await Promise.all([
    mainRes,
    programsRes,
  ]);
  return {
    props: {
      data,
      slide,
    },
  };
}