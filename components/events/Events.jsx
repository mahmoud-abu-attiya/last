import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import Snackbar from '../snackbar'

const Events = ({ event, en }) => {
  const [formError, setFormError] = useState({})

  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const snackbarRef = useRef(null)

  const counter = () => {
    let countDownDate = new Date(event.event_date).getTime()
    let dateNow = new Date().getTime()
    let dateDiff = countDownDate - dateNow
    const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000)
    if (dateDiff < 0) {
      setDate({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    } else {
    setDate({ days, hours, minutes, seconds })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      counter()
    }, 1000)
    return () => clearInterval(interval)
  }, [event.event_date])

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      setFormError(validate(event.target.email.value))
      const endpoint =
        'https://backend.elnagahtravels.com/public/api/newsletters'

      // Form the request for sending data to the server.
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${event.target.email.value}`,
      }

      if (
        event.target.email.value &&
        /^\S+@\S+\.\S+$/.test(event.target.email.value)
      ) {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setSnackbarMsg(result.message || result)
        snackbarRef.current.show()
        event.target.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validate = (value) => {
    const errors = {}
    if (!value) {
      errors.email = 'هذا الحقل مطلوب'
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      errors.email = 'البريد الالكتروني غير صالح'
    }
    return errors
  }
  return (
    <div className={`bg-[#add8e6] dark:bg-[#094c62] ${styles.events}`}>
      <div
        className='dots dots-up'
      ></div>
      <div
        className='dots dots-down'
      ></div>
      <h2
        className={`text-secondary dark:text-white ${styles.title}`}
      >
        {en ? "Latest events" : "أخر الأحداث"}
      </h2>
      <div className='container'>
        <div className={styles.info}>
          <div
            className={styles.time}
          >
            <div className={`dark:bg-gray-900 border dark:border-gray-700 ${styles.unit}`}>
              <span className={styles.unit__firstSpan}>{date.days || 0}</span>
              <span className={` border-t dark:border-gray-700 ${styles.unit__lastSpan}`}>{en ? "Day" : "يوم"}</span>
            </div>
            <div className={`dark:bg-gray-900 border dark:border-gray-700 ${styles.unit}`}>
              <span className={styles.unit__firstSpan}>{date.hours || 0}</span>
              <span className={` border-t dark:border-gray-700 ${styles.unit__lastSpan}`}>{en ? "Houre" : "ساعة"}</span>
            </div>
            <div className={`dark:bg-gray-900 border dark:border-gray-700 ${styles.unit}`}>
              <span className={styles.unit__firstSpan}>
                {date.minutes < 10
                  ? `0${date.minutes || 0}`
                  : date.minutes || 0}
              </span>
              <span className={` border-t dark:border-gray-700 ${styles.unit__lastSpan}`}>{en ? "Minute" : "دقيقة"}</span>
            </div>
            <div className={`dark:bg-gray-900 border dark:border-gray-700 ${styles.unit}`}>
              <span className={styles.unit__firstSpan}>
                {date.seconds < 10
                  ? `0${date.seconds || 0}`
                  : date.seconds || 0}
              </span>
              <span className={` border-t dark:border-gray-700 ${styles.unit__lastSpan}`}>{en ? "Second" : "ثانية"}</span>
            </div>
          </div>
          <h2
            className={`text-secondary dark:text-white ${styles.title}`}
          >
            {en ? event.title_en : event.title}
          </h2>
          <p
            className={`text-gray-600 dark:text-gray-400 ${styles.description}`}
          >
            {en ? event.content_en : event.content}
          </p>
        </div>
        <div className={styles.subscribe}>
          <form onSubmit={handleSubmit} className={`bg-gray-50 dark:bg-secondary ${styles.subscribe__form}`}>
            <div className={styles.form__field}>
              <input
                type='text'
                placeholder={en ? "Enter email" : 'ادخل البريد الالكتروني'}
                name='email'
                className={`dark:bg-gray-800 dark:text-white ${styles.email__input}`}
                noValidate
              />
              <button type='submit' className={styles.submit__input}>
                {en ? "Subscribe" : "اشترك"}
              </button>
            </div>
            <small style={{ color: 'red' }}>{formError.email}</small>
          </form>
        </div>
      </div>
      <Snackbar ref={snackbarRef} message={snackbarMsg} type={'success'} />
    </div>
  )
}

export default Events
