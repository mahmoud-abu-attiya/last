import styles from './index.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Testimonials = ({ data }) => {
  return (
    <div className={styles.testimonials} id='testimonials'>
      <div className={`${styles.container} container`}>
        {data.map((person, i) => (
          <div className={styles.box} key={i}>
            <div className={styles.img}>
            <Image src={person.image} alt={person.name} className='w-[100px] h-[100px] object-cover' width={100} height={100}/>
            </div>
            <h3>{person.name}</h3>
            {person.jobtitle && (
              <span className={styles.title}>{person.jobtitle}</span>
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
            {person.content && <p>{person.content}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
