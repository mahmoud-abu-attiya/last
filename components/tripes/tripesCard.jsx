import styles from './index.module.css'
// import { BsArrowUpLeft } from 'react-icons/bs'
import BtnArrow from '../BtnArrow'
import Image from 'next/image'
import { useSelector } from 'react-redux'

const TripesCard = ({ item }) => {
  const settings = useSelector((state) => state.settings.value)
  return (
    <div className="flip-card rounded-3xl my-14 relative">
    <div className="flip-card-inner rounded-3xl">
      <div className="flip-card-front rounded-3xl overflow-hidden p-4 flex">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        <div className="flex w-full gap-8 justify-between items-center mt-auto">
          <h3 className="title md:text-xl lg:text-2xl text-white font-bold mb-4">
            {item.name}
          </h3>
          <span className="text-primary min-w-[3rem] w-12 h-12 border border-primary rounded-full flex justify-center items-center">
            <i className="fal fa-arrow-left rotate-45"></i>
          </span>
        </div>
      </div>
      <div className={`flip-card-back rounded-3xl overflow-hidden bg-white text-secondary p-4 sm:p-6 flex flex-col gap-2 sm:gap-5 items-start ${styles.card__back}`}>
      <Image
            src={settings.logo}
            alt={`tripes logo ${item.name}`}
            width={102}
            height={70}
            className={styles.back__logo}
          />
          <h3 className={styles.back__title}>{item.name}</h3>
          <div className={styles.card__btn}>
            <BtnArrow
              title='تفاصيل البرنامج'
              href={`/${
                item.country_for === 'discounts' ? 'sales' : 'our-programs'
              }/${item.id}`}
            />
          </div>
      </div>
    </div>
  </div>
  )
}

export default TripesCard