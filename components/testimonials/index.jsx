import styles from './index.module.css'
// import { BsFillStarFill } from 'react-icons/bs'
import { memo } from 'react'
import Image from 'next/image'

const Testimonials = ({ data }) => {
  return (
    <div className={styles.testimonials} id='testimonials'>
      <div className={`${styles.container} container`}>
        {data?.map((person, i) => (
          <div className={styles.box} key={i}>
            <div className={styles.img}>
            <Image src={person.image} alt={person.name} width={100} height={100}/>
            </div>
            <h3>{person.name}</h3>
            {person.jobtitle && (
              <span className={styles.title}>{person.jobtitle}</span>
            )}
            <div className={styles.rate}>
              {/* <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill /> */}
            </div>
            {person.content && <p>{person.content}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Testimonials)
