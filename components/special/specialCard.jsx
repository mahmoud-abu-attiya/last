import styles from './index.module.css'
// import { BsArrowLeft } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SpecialCard = ({ item, settings }) => {
  const router = useRouter()
  const routerTo = () => {
    router.push(`/special-offers/${item.id}`)
  }
  const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
  return (
      <div className={styles.card} onClick={() => routerTo()}>
        <Image
          src={item?.image}
          fill
          alt={item?.id}
          quality={50}
          className={styles.card__img}
        />
        <div className={styles.card__content}>
          <Link href={`/special-offers/${item.id}`} className={styles.card__btn}>
              التفاصيل
              {/* <BsArrowLeft className={styles.card__btn__icon} /> */}
              <span className={styles.card__btn__icon}>

              <i class="fas fa-arrow-left"></i>
              </span>
          </Link>
          <a
            className={styles.card__btn}
            href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}&${message}`}
            target='_blank'
            rel='noreferrer'
          >
            حجر العرض
            {/* <BsArrowLeft className={styles.card__btn__icon} /> */}
            <span className={styles.card__btn__icon}>

            <i class="fas fa-arrow-left"></i>
            </span>
          </a>
        </div>
      </div>
  )
}

export default SpecialCard
