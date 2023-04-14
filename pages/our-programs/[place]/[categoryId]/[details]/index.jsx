import styles from './index.module.css'
import Image from 'next/image'
// import {
//   AiOutlineArrowLeft,
//   AiFillPlusCircle,
//   AiFillMinusCircle,
//   AiFillStar,
// } from 'react-icons/ai'
// import {
//   BsFillCircleFill,
//   BsCheckCircleFill,
//   BsFillSunFill,
//   BsFillMoonFill,
//   BsFillPeopleFill,
// } from 'react-icons/bs'
import BtnArrow from '@/components/BtnArrow'
// import { MdLocationOn } from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'
import ScrollDown from '../../../../../components/scrollDown'
import { useRef, useState } from 'react'
import Snackbar from '../../../../../components/snackbar'

const Details = (props) => {
  // const router = useRouter()
  // const { details: detailsId, categoryId, place } = router.query
  // console.log(categoryId)
  // console.log(place)
  // console.log(detailsId)
  // const [programs, setPrograms] = useState([])
  // const [program, setProgram] = useState({})
  // const [settings, setSettings] = useState({})
  const program = props.program
  const programs = props.programs
  const settings = props.settings
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const regex = /^\S+@\S+\.\S+$/

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
  return (
    <>
      <Head>
        
          <title>
            {`${program?.category?.name} - ${program?.country?.name}`}
          </title>
        
      </Head>
      {program?.image && (
        <>
          <div className={styles.details__bg}>
            <Image src={program?.image} alt={program?.title} fill />
            <h1>
              {program?.category?.name} - {program?.country?.name}
            </h1>
            <ScrollDown />
          </div>
          <div className={styles.details}>
            <div className={styles.details__info}>
              <h2>
                {program?.category?.name} - {program?.country?.name}
              </h2>
              <div className={styles.details__details}>
                <h3>
                  {/* <AiOutlineArrowLeft /> تفاصيل البرنامج السياحي */}
                </h3>
                <div className={styles.details__days}>
                  {program?.program_days?.map((day, i) => (
                    <div className={styles.details__day} key={i}>
                      <h4>
                        {/* <BsFillCircleFill /> {day?.name} */}
                      </h4>
                      <p>{day?.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.details__includes}>
                <h3>
                  {/* <AiOutlineArrowLeft /> */}
                  مشتملات الرحلة
                </h3>
                <div className={styles.details__contents}>
                  <div className={styles.details__content}>
                    <h4>الرحلة تشمل:</h4>
                    <ul>
                      {program?.includes?.map((item, i) => (
                        <li key={i}>
                          {/* <AiFillPlusCircle className={styles.green} /> */}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.details__content}>
                    <h4>الرحلة لا تشمل:</h4>
                    <ul>
                      {program?.exculdes?.map((item, i) => (
                        <li key={i}>
                          {/* <AiFillMinusCircle className={styles.red} /> */}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {program?.activities?.length > 0 && (
                    <div className={styles.details__content}>
                      <h4>أنشطة الرحلة:</h4>
                      <ul>
                        {program?.activities?.map((item, i) => (
                          <li key={i}>
                            {/* <BsCheckCircleFill className={styles.green} /> */}
                            {item[0]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.details__form}>
              <div className={styles.details__form__card}>
                <h3>السعر</h3>
                <div className={styles.details__card__price}>
                  <div>
                    <span className={styles.new__price}>
                      {program?.price_after_discount}
                    </span>
                    ريال سعودي
                  </div>
                  <div>
                    بدلا من
                    <span className={styles.old__price}>{program?.price}</span>
                  </div>
                </div>
              </div>
              <form
                className={styles.details__form__cards}
                onSubmit={handleSubmit}
              >
                <div className={styles.details__form__card}>
                  <label htmlFor='name'>الاسم</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='الاسم'
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
              <Snackbar
                ref={snackbarRef}
                message={snackbarMsg}
                type={'success'}
              />
            </div>
          </div>
          {programs?.filter((prog) => prog?.id !== program?.id).length > 0 && (
            <div className={styles.similar}>
              <h2>برامج مشابهة</h2>
              <div className={styles.similar__cards}>
                {programs
                  ?.filter((prog) => prog?.id !== program?.id)
                  .slice(0, 3)
                  .map((prog) => (
                    <div className={styles.similar__card} key={prog?.id}>
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
                              {/* <BsFillSunFill /> */}
                              {prog?.days} أيام
                            </span>
                            <span>
                              {/* <BsFillMoonFill /> */}
                              {prog?.nights} ليالي
                            </span>
                            <span>
                              {/* <MdLocationOn /> */}
                              {prog?.country?.name}
                            </span>
                            {prog.people && (
                              <span>
                                {/* <BsFillPeopleFill /> */}
                                {program.people}
                              </span>
                            )}
                          </div>
                          <div className={styles.similar__heading}>
                            <Link
                              href={`/our-programs/${prog?.country?.id}/${prog?.category?.id}/${prog?.id}`}
                            >
                              <a>
                                <h3 className={styles.similar__card__title}>
                                  {prog?.title} {prog?.rate} نجوم
                                </h3>
                              </a>
                            </Link>
                            <div className={styles.stars}>
                              {Array.from(Array(prog.rate)).map((s, i) => (
                                // <AiFillStar key={i} />
                                <span key={i}>ss</span>
                              ))}
                            </div>
                          </div>
                          <div className={styles.similar__card__price}>
                            <div>
                              <span className={styles.new__price}>
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
                              textColor='#222'
                              href={`/our-programs/${prog?.country?.id}/${prog?.category?.id}/${prog?.id}`}
                            />
                            <BtnArrow
                              title='حجز العرض'
                              textColor='#222'
                              href={`https://api.whatsapp.com/send?phone=${
                                settings?.whatsup
                              }&${message(prog?.id)}`}
                              target='_blank'
                              rel='noreferrer'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Details

export const getServerSideProps = async(context)=>{
  const place  = context.params.place
  const categoryId  = context.params.categoryId
  const detailsId  = context.params.details
  try {
    if (place && categoryId && detailsId) {
      const [response, settingsRes, progRes] = await Promise.all([
        fetch(
          `https://backend.elnagahtravels.com/public/api/programs_details/${detailsId}`
        ),
        fetch(`https://backend.elnagahtravels.com/public/api/settings`),
        fetch(
          `https://backend.elnagahtravels.com/public/api/programs?country_id=${place}&category_id=${categoryId}`
        ),
      ])
      if (response.status !== 200)
      return {
      notFound: true,
      }
      const [{ program = {} }, { settings = {} }, { programs = [] }] =
        await Promise.all([
          response.json(),
          settingsRes.json(),
          progRes.json(),
        ])
        
        return {
          props : {
            program ,
            settings ,
            programs
          }
        }
    }
  } catch (error) {
    console.log(error)
  }
}