import Image from 'next/image'
import Link from 'next/link'
import BtnArrow from '../BtnArrow'
import styles from './index.module.css'
import { useSelector } from 'react-redux'

const NewPrograms = ({ programs }) => {
  const settings = useSelector((state) => state.settings.value)
  const message = (id) => {
    const program = programs.find((p) => p.id === id)
    return `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة - الوجهة: ${program.title}, عدد الايام: ${program.days}, عدد الليالي: ${program.nights}, السعر بعد الخصم: ${program.price}`
  }
  return (
    <div className={styles.newPrograms__container}>
      <h2
        className={styles.newPrograms__title}
        // variants={topToBottomAnimation}
        // initial='hidden'
        // whileInView='show'
        // viewport={{ once: true }}
      >
        أحدث البرامج السياحية
      </h2>
      <div className={styles.newPrograms__cards}>
        {programs.slice(0, 3).map((program) => (
          <div className={styles.newPrograms__card} key={program.id}>
            <div className={styles.newPrograms__img__container}>
              <Image
                src={program.image}
                alt={program.title}
                fill
                className={styles.newPrograms__card__img}
              />
            </div>
            <div className={styles.newPrograms__card__content}>
              <div className={styles.newPrograms__card__period}>
              <span>
                        {/* <BsFillSunFill /> */}
                        <i class="fas fa-sun"></i>
                        {program.days} أيام
                      </span>
                      <span>
                        {/* <BsFillMoonFill /> */}
                        <i class="fas fa-moon"></i>
                        {program.nights} ليالي
                      </span>
                      <span>
                        {/* <MdLocationOn /> */}
                        <i class="fas fa-map-marker-alt"></i>
                        {program.country.name}
                      </span>
                      {program.people && (
                        <span>
                          {/* <BsFillPeopleFill /> */}
                          <i class="fas fa-user-friends"></i>
                          {program.people}
                        </span>
                )}
              </div>
              <div className={styles.newPrograms__heading__container}>
                <div className={styles.newPrograms__heading}>
                  <Link
                    href={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
                  >
                      <h3 className={styles.newPrograms__card__title}>
                        {program.title}{' '}
                        {program.category.name && program.category.name}{' '}
                      </h3>
                  </Link>
                </div>
                <div className={styles.stars}>
                  {Array.from(Array(program.rate)).map((s, i) => (
                     <i class="fas fa-star text-yellow-400" key={i}></i>
                  ))}
                </div>
              </div>
              <div className={styles.newPrograms__card__price}>
                <span className={styles.new__price}>{program.price}</span> ريال
                سعودي
              </div>
              <div className={styles.newPrograms__card__btns}>
                <BtnArrow
                  title='تفاصيل العرض'
                  href={`/our-programs/${program.country.id}/${program.category.id}/${program.id}`}
                />
                <BtnArrow
                  title='حجز العرض'
                  href={`https://api.whatsapp.com/send?phone=${
                    settings.whatsup
                  }&${message(program.id)}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewPrograms
