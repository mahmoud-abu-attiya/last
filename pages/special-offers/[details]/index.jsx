import styles from './index.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import ScrollDown from '../../../components/scrollDown'
import { useEffect, useRef, useState } from 'react'
import SpecialCard from '../../../components/special/specialCard'
import Snackbar from '../../../components/snackbar'
import { useSelector } from 'react-redux'

const Details = () => {
  const settings = useSelector((state) => state.settings.value)
  const [offerDetails, setOfferDetails] = useState({})
  const [offers, setOffers] = useState([])
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const regex = /^\S+@\S+\.\S+$/
  const router = useRouter()
  const {
    query: { details },
  } = router

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
  const fetchData = async () => {
    if(details){
      try {
        const [offerRes, offersRes] = await Promise.all([
          fetch(
            `https://backend.elnagahtravels.com/public/api/special_offers/${details}`
            ),
            fetch('https://backend.elnagahtravels.com/public/api/special_offers'),
          ])
      if(offerRes.status !== 200)
      router.push('/')
      const [{ special_offer = {} }, { special_offers = [] }] =
      await Promise.all([offerRes.json(), offersRes.json()])
      setOfferDetails(special_offer)
      setOffers(special_offers)
    } catch (error) {
      // router.push('/')
      console.log(error)
    }
  }
}
  useEffect(() => {
    fetchData()
  }, [details])

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
      const endpoint = `https://backend.elnagahtravels.com/public/api/programs/${details}/reserve`

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
  return (
    offerDetails &&
    <>
      <Head>
        <title>{offerDetails?.title}</title>
        <title>{settings?.meta_title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings?.meta_description}
            />
            <meta property="og:title" content={settings?.meta_title} />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings?.keywords} />
            <meta
               property="og:description"
               content={settings?.meta_description}
            />
            <meta name="twitter:title" content={settings?.meta_title} />
            <meta
               name="twitter:description"
               content={settings?.meta_description}
            />
      </Head>
      <div className={styles.details__bg}>
        {offerDetails.image && (
          <Image
            src={offerDetails?.image}
            alt={offerDetails?.title}
            fill
            objectFit='fill'
            unoptimized={true}
            priority={true}
          />
        )}
        <h1>{offerDetails?.title}</h1>
        <ScrollDown />
      </div>
      <div className={styles.details}>
        <div className={styles.details__info}>
          <h2>{offerDetails?.title}</h2>
          <div className={styles.details__details}>
            <h3>
              <i className="fal fa-arrow-left text-primary"></i> تفاصيل البرنامج السياحي
            </h3>
            <div className={styles.details__days}>
              {offerDetails?.program_days?.map((day, i) => (
                <div className={styles.details__day} key={i}>
                  <h4>
                    <span className='w-3 h-3 bg-primary rounded-full' /> {day?.name}
                  </h4>
                  <p>{day?.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.details__includes}>
            <h3>
              <i className="fal fa-arrow-left text-primary"></i>
              مشتملات الرحلة
            </h3>
            <div className={styles.details__contents}>
              <div className={styles.details__content}>
                <h4>الرحلة تشمل:</h4>
                <ul>
                  {offerDetails?.includes?.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-plus-circle text-green-600"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.details__content}>
                <h4>الرحلة لا تشمل:</h4>
                <ul>
                  {offerDetails?.exculdes?.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-minus-circle text-red-500"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.details__content}>
                <h4>أنشطة الرحلة:</h4>
                <ul>
                  {offerDetails?.activities?.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle text-green-600"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details__form}>
          <div className={styles.details__form__card}>
            <h3>السعر</h3>
            <div className={styles.details__card__price}>
              <div>
                <span className={styles.new__price}>
                  {offerDetails?.price_after_discount}
                </span>
                ريال سعودي
              </div>
              <div>
                بدلا من
                <span className={styles.old__price}>{offerDetails?.price}</span>
              </div>
            </div>
          </div>
          <form className={styles.details__form__cards} onSubmit={handleSubmit}>
            <div className={styles.details__form__card}>
              <label htmlFor='name'>الاسم</label>
              <input type='text' id='name' name='name' placeholder='الاسم' />
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
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.phone}
              </small>
            </div>
            <div className={styles.details__form__card}>
              <label htmlFor='travling_date'>تاريخ السفر</label>
              <input
                type='date'
                id='travling_date'
                name='travling_date'
                placeholder='تاريخ السفر'
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
              />
              <small style={{ color: 'red', fontSize: '.6rem' }}>
                {formErrors?.childs_number}
              </small>
            </div>
            <button className={styles.form__btn} type='submit'>
              ارسال
            </button>
          </form>
          <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
        </div>
      </div>
      {offers.filter((prog) => prog?.id !== offerDetails?.id).length > 0 && (
        <div className={styles.similar}>
          <h2>برامج مشابهة</h2>
          <div className={styles.similar__cards}>
            {offers
              ?.filter((offer) => offer?.id !== offerDetails?.id)
              .slice(0, 3)
              .map((offer) => (
                <SpecialCard item={offer} key={offer?.id} />
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Details
// export  async function getStaticProps(){
//   return {
//     props : {
//       place : 0
//     }
//   }
// }
// export const getStaticPaths = async ()=>{
//   const paths = []
//   const req = await fetch ('https://backend.elnagahtravels.com/public/api/special_offers')

//   const data = await req.json();
//   // console.log(data)
//     data.special_offers.forEach(el=>{
//       paths.push({
//       params : {details : `${el.id}`}
//       })
//     })
//   // console.log(paths)
//   return{
//     paths ,
//     fallback : false,
//   }
// }
