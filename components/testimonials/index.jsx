import styles from './index.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Testimonials = ({ data }) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-900 ${styles.testimonials}`} id='testimonials'>
      <div className={`${styles.container} container`}>
        {data.map((person, i) => (
          <div className={` bg-white dark:bg-gray-800 dark:text-white ${styles.box}`} key={i}>
            <div className={` border-[10px] border-gray-50 dark:border-gray-900 ${styles.img}`}>
              <Image src={person.image} alt={person.name} className='w-[100px] h-[100px] object-cover' width={100} height={100} />
            </div>
            <h3>{person.name}</h3>
            {person.jobtitle && (
              <span className={`text-gray-600 dark:text-gray-400 ${styles.title}`}>{person.jobtitle}</span>
            )}
            <div className={styles.rate}>
              {/* <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i> */}
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            {person.content && <p className='text-gray-600 dark:text-gray-400'>{person.content}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
