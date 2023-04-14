import styles from './index.module.css'
// import { BsSnapchat, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
// import { FaTiktok } from 'react-icons/fa'
import { memo } from 'react'

const SocialMedia = ({ settings }) => {
  return (
    <div className={styles.container}>
      <a
        href={settings?.instagram}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Instagram'
        className={`${styles.instagram} ${styles.link}`}
      >
        {/* <BsInstagram className={styles.icon} /> */}
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href={settings?.snapchat}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Snapchat'
        className={`${styles.snapchat} ${styles.link}`}
      >
        {/* <BsSnapchat className={styles.icon} /> */}
        <i className="fab fa-snapchat-ghost"></i>
      </a>
      <a
        href={settings?.tiktok}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Tiktok'
        className={`${styles.tiktok} ${styles.link}`}
      >
        {/* <FaTiktok className={styles.icon} /> */}
        <i className="fab fa-tiktok"></i>
      </a>
      <a
        href={settings?.twitter}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Twitter'
        className={`${styles.twitter} ${styles.link}`}
      >
        {/* <BsTwitter className={styles.icon} /> */}
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href={settings?.youtube}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Youtube'
        className={`${styles.youtube} ${styles.link}`}
      >
        {/* <BsYoutube className={styles.icon} /> */}
        <i className="fab fa-youtube"></i>
      </a>
    </div>
  )
}

export default memo(SocialMedia)
