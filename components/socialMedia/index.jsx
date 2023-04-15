import styles from './index.module.css'
import { memo } from 'react'
import { useSelector } from 'react-redux'

const SocialMedia = () => {
  const settings = useSelector((state) => state.settings.value)
  return (
    <div className={styles.container}>
      <a
        href={settings.instagram}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Instagram'
        className={`${styles.instagram} ${styles.link}`}
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href={settings.snapchat}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Snapchat'
        className={`${styles.snapchat} ${styles.link}`}
      >
        <i className="fab fa-snapchat-ghost"></i>
      </a>
      <a
        href={settings.tiktok}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Tiktok'
        className={`${styles.tiktok} ${styles.link}`}
      >
        <i className="fab fa-tiktok"></i>
      </a>
      <a
        href={settings.twitter}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Twitter'
        className={`${styles.twitter} ${styles.link}`}
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href={settings.youtube}
        target='_blank'
        rel='noreferrer'
        aria-label='Fixed Link - Youtube'
        className={`${styles.youtube} ${styles.link}`}
      >
        <i className="fab fa-youtube"></i>
      </a>
    </div>
  )
}

export default memo(SocialMedia)
