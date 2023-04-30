import styles from './index.module.css'
// import { BsArrowLeft } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SpecialCard = ({ item }) => {
  const settings = useSelector((state) => state.settings.value)
  const router = useRouter()
  const routerTo = () => {
    router.push(`/special-offers/${item.id}`)
  }
  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
      <div className={styles.card} onClick={() => routerTo()}>
        <Image
          src={ item.image ||"/images/placeholder.webp"}
          fill
          alt={item.id}
          quality={50}
          className="object-cover"
        />
        <div className={styles.card__content}>
          <Link href={`/special-offers/${item.id}`} className={styles.card__btn}>
              التفاصيل
              {/* <BsArrowLeft className={styles.card__btn__icon} /> */}
              <span className={styles.card__btn__icon}>

              {/* <i className="fas fa-arrow-left"></i> */}
              <FontAwesomeIcon icon={faArrowLeft} />
              </span>
          </Link>
          <a
            className={styles.card__btn}
            href={`https://api.whatsapp.com/send?phone=${settings.whatsup}&${message}`}
            target='_blank'
            rel='noreferrer'
          >
            حجر العرض
            {/* <BsArrowLeft className={styles.card__btn__icon} /> */}
            <span className={styles.card__btn__icon}>

            {/* <i className="fas fa-arrow-left"></i> */}
            <FontAwesomeIcon icon={faArrowLeft} />
            </span>
          </a>
        </div>
      </div>
  )
}

export default SpecialCard
