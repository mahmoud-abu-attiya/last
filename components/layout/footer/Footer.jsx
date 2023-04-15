import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import { useSelector } from 'react-redux'

const Footer = ({ countries }) => {
  const settings = useSelector((state) => state.settings.value)
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.up__section}>
        <div
          className={styles.famous__places}
        >
          <h3 className={styles.title}>أشهر الوجهات السياحية</h3>
          {countries?.slice(0, 7).map((country) => (
            <span key={country?.id} className={styles.famous__places__span}>
              <Link href={`/our-programs/${country?.id}`} className={styles.famous__places__link}>
                <i className="fal fa-angle-left text-xl"></i>
                {country?.name}
              </Link>
            </span>
          ))}
        </div>
        <div
          className={styles.call__us}
        >
          <h3 className={styles.title}>اتصل بنا</h3>
          <div className={styles.call__us__head}>
            <i className="fas fa-headset"></i>
            للحجز والاستفسار
          </div>
          <span className={styles.call__us__span}>فضلا الإتصال على</span>
          <div className={styles.call__us__container}>
            <a
              href={`mailto:${settings?.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <i className="fas fa-envelope text-primary"></i>
              {settings?.email}
            </a>
            <a
              href={`tel:${settings?.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <i className="fas fa-phone-alt text-primary"></i>
              {settings?.phone}
            </a>
            <a
              href={`tel:${settings?.mobile}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <i className="fas fa-mobile text-primary"></i>
              {settings?.mobile}
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.contact__link}
            >
              <i className="fab fa-whatsapp text-primary"></i>
              {settings?.whatsup}
            </a>
          </div>
          <span className={styles.call__us__span}>
            حتى نتمكن من خدمتكم بشكل أفضل
          </span>
        </div>
        <div
          className={styles.location}
        >
          <h3 className={styles.title}>موقعنا</h3>
          {settings?.address}
          {settings?.latitude && settings?.longitude && (
            <iframe
              src={`https://maps.google.com/maps?q=${settings?.latitude},${settings?.longitude}&zoom=15&hl=es;&output=embed&lazy=1&iframe=1`}
              width='260px'
              height='280px'
              style={{ border: 'none', marginTop: '.5rem' }}
              allowFullScreen=''
              loading='lazy'
              title='footer map saudi arabia'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          )}
        </div>
        <div
          className={styles.social}
        >
          <h3 className={styles.title}>تابعنا علي</h3>
          <div className={styles.social__icons}>
            <a
              href={settings?.instagram}
              target='_blank'
              rel='noreferrer'
              className={styles.instagram}
              aria-label='Footer Link - Instagram'
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href={settings?.tiktok}
              target='_blank'
              rel='noreferrer'
              className={styles.tiktok}
              aria-label='Footer Link - Tiktok'
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href={settings?.twitter}
              target='_blank'
              rel='noreferrer'
              className={styles.twitter}
              aria-label='Footer Link - Twitter'
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={settings?.snapchat}
              target='_blank'
              rel='noreferrer'
              className={styles.snapchat}
              aria-label='Footer Link - Snapchat'
            >
              <i className="fab fa-snapchat-ghost"></i>
            </a>
            <a
              href={settings?.youtube}
              target='_blank'
              rel='noreferrer'
              className={styles.youtube}
              aria-label='Footer Link - Youtube'
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        {settings?.logo && (
          <Link href='/' className={styles.f__logo}>
            <Image
              src={settings?.logo}
              width={145}
              height={100}
              alt='wsam elnagah logo'
            />
          </Link>
        )}
        <button
          onClick={scrollToTop}
          title='ارجع الي الاعلي'
          className={styles.scroll__top__btn}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>

      <p className={styles.copyright}>
        <span className={styles.copyright__text}>{settings?.copy_rights}</span>
        <span className={styles.copyright__msg}>
          Made with
          <i className="fas fa-heart text-red-500"></i>
          in Elnagah
        </span>
      </p>
    </footer>
  )
}

export default memo(Footer)
