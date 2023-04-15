import Image from 'next/image'
import Link from 'next/link'
// import { memo } from 'react'
// import { AiFillStar } from 'react-icons/ai'
// import { BsFillMoonFill, BsFillPeopleFill, BsFillSunFill } from 'react-icons/bs'
// import { MdLocationOn } from 'react-icons/md'
import BtnArrow from '../BtnArrow'
import styles from './index.module.css'

const NewPrograms = ({ programs, settings }) => {
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
                  {program.days} أيام
                </span>
                <span>
                  {/* <BsFillMoonFill /> */}
                  {program.nights} ليالي
                </span>
                <span>
                  {/* <MdLocationOn /> */}
                  {program.country.name}
                </span>
                {program.people && (
                  <span>
                    {/* <BsFillPeopleFill /> */}
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
                    // <AiFillStar key={i} />
                    <span key={i} />
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
                    settings?.whatsup
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
