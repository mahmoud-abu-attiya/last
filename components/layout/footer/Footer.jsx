import styles from './index.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { faInstagram, faTwitter, faYoutube, faWhatsapp, faTiktok, faSnapchat} from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft, faArrowUp, faMobile, faEnvelopeOpenText, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SubFooter = ({ settings }) => {
  const [glitter, setGlitter] = useState(1)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (glitter < 5 ) {
        setGlitter(e => e + 1);
      } else {
        setGlitter(1);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [glitter]);

  return (
    <div className="sticky subFooter bottom-0 lg:p-4 lg:px-16 grid grid-cols-4 lg:bg-gray-100 z-20 lg:gap-0">
      <a href={`tel:${settings?.mobile}`} className={`${glitter === 1 ? "glitter" : ""} lg:shadow-none phone bg-[green] p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10`} target='_blank' rel='noreferrer' aria-label='Mobile'>
        {/* <i className="fal fa-mobile text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
        <div className="icon">
          <FontAwesomeIcon icon={faMobile} className='text-white lg:text-primary text-3xl sm:text-4xl' />
        </div>
        <div className='hidden lg:block'>
          <p className="text-xs">اتصل بنا علي المحمول.</p>
          <p className="link bold hover:underline">{settings?.mobile}</p>
        </div>
      </a>
      <a href={`tel:${settings?.phone}`} className={`${glitter === 2 ? "glitter" : ""} lg:shadow-none hours p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 lg:border-r-2 border-gray-300`} target='_blank' rel='noreferrer' aria-label='Phone'>
        {/* <i className="fas fa-phone-rotary text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
        <div className="icon">
        <Image src="/icons/24-7.png" alt="phone" width={40} height={40} />
        </div>
        <div className='hidden lg:block'>
          <p className="text-xs">اتصل بنا علي الهاتف الرضي.</p>
          <p className="link bold hover:underline">{settings?.phone}</p>
        </div>
      </a>
      <a href={`mailto:${settings?.email}`} className={`${glitter === 3 ? "glitter" : ""} lg:shadow-none email bg-blue-500 p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 lg:border-r-2 border-gray-300`} target='_blank' rel='noreferrer' aria-label='Email'>
        {/* <i className="fal fa-envelope-open-text text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelopeOpenText} className='text-white lg:text-primary text-3xl sm:text-4xl' />
        </div>
        <div className='hidden lg:block'>
          <p className="text-xs">يمكنك مراسلتنا علي البريد الالكتروني.</p>
          <p className="link bold hover:underline">{settings?.email}</p>
        </div>
      </a>
      <a href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}`} className={`${glitter === 4 ? "glitter" : ""} lg:shadow-none whats bg-green-500 p-4 lg:p-0 lg:bg-transparent flex items-center justify-center gap-6 md:px-10 lg:border-r-2 border-gray-300`} target='_blank' rel='noreferrer' aria-label='WhatsApp'>
        {/* <i className="fab fa-whatsapp text-white lg:text-primary text-3xl sm:text-4xl"></i> */}
        <div className="icon">
          <FontAwesomeIcon icon={faWhatsapp} className='text-white lg:text-primary text-3xl sm:text-4xl' />
        </div>
        <div className='hidden lg:block'>
          <p className="text-xs">تواصل معنا عن طرق الواتساب.</p>
          <p className="link bold hover:underline">{settings?.whatsup}</p>
        </div>
      </a>
    </div>
  )
}


const Footer = ({ countries }) => {
  const settings = useSelector((state) => state.settings.value)

  return (
    <>
      <SubFooter settings={settings} />
      <footer className={styles.footer}>
        <div className={styles.up__section}>
          <div
            className={styles.famous__places}
          >
            <h3 className={styles.title}>أشهر الوجهات السياحية</h3>
            {countries?.slice(0, 7).map((country) => (
              <span key={country.id} className={styles.famous__places__span}>
                <Link href={`/our-programs/${country.id}`} className={styles.famous__places__link}>
                  {/* <i className="fal fa-angle-left text-xl"></i> */}
                  <FontAwesomeIcon icon={faAngleLeft} />
                  {country.name}
                </Link>
              </span>
            ))}
          </div>
          {/* <div
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
        </div> */}
          <div
            className={styles.location}
          >
            <h3 className={styles.title}>موقعنا</h3>
            {settings?.address}
            {/* {settings?.latitude && settings.longitude && (
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
            )} */}
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
                {/* <i className="fab fa-instagram"></i> */}
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href={settings?.tiktok}
                target='_blank'
                rel='noreferrer'
                className={styles.tiktok}
                aria-label='Footer Link - Tiktok'
              >
                {/* <i className="fab fa-tiktok"></i> */}
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a
                href={settings?.twitter}
                target='_blank'
                rel='noreferrer'
                className={styles.twitter}
                aria-label='Footer Link - Twitter'
              >
                {/* <i className="fab fa-twitter"></i> */}
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href={settings?.snapchat}
                target='_blank'
                rel='noreferrer'
                className={styles.snapchat}
                aria-label='Footer Link - Snapchat'
              >
                {/* <i className="fab fa-snapchat-ghost"></i> */}
                <FontAwesomeIcon icon={faSnapchat} />
              </a>
              <a
                href={settings?.youtube}
                target='_blank'
                rel='noreferrer'
                className={styles.youtube}
                aria-label='Footer Link - Youtube'
              >
                {/* <i className="fab fa-youtube"></i> */}
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          {settings?.logo && (
            <Link href='/' className={styles.f__logo}>
              <Image
                src="/images/logo.webp"
                width={145}
                height={100}
                alt='wsam elnagah logo'
                className='object-cover'
              />
            </Link>
          )}
          <a
            href={"#"}
            title='ارجع الي الاعلي'
            className={styles.scroll__top__btn}
          >
            {/* <i className="fas fa-arrow-up"></i> */}
            <FontAwesomeIcon icon={faArrowUp} className='text-2xl md:text-3xl' />
          </a>
        </div>

        <p className={styles.copyright}>
          <span className={styles.copyright__text}>{settings?.copy_rights}</span>
          <span className={styles.copyright__msg}>
            Made with
            {/* <i className="fas fa-heart text-red-500"></i> */}
            <FontAwesomeIcon icon={faHeart} className='text-red-500 text-sm' />
            in Elnagah
          </span>
        </p>
      </footer>
    </>
  )
}

export default Footer
