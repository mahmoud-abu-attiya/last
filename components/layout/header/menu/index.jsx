import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faTwitter, faTiktok, faSnapchat, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useSelector } from 'react-redux'

export const headerLinks = [
  {
    text:{
      en: "Home",
      ar:  'الرئيسية',
    },
    route: '/',
    icon: "/icons/home.svg"
  },
  {
    text:{
      en: "Tourism programmes",
      ar:  'البرامج السياحية',
    },
    route: '/our-programs',
    icon: "/icons/flag.svg"
  },
  {
    text:{
      en: "Special Offers",
      ar:  'العروض المميزة',
    },
    route: '/special-offers',
    icon: "/icons/thunder.svg"
  },
  {
    text:{
      en: "Tourist guide",
      ar:  'الدليل السياحي',
    },
    route: '/city-guides',
    icon: "/icons/offer.svg"
  },
  {
    text:{
      en: "Aviation",
      ar:  'الطيران',
    },
    route: '/aviation',
    icon: "/icons/plane.svg"
  },
  {
    text:{
      en: "Hotel reservation",
      ar:  'حجز فنادق',
    },
    route: '/book-hotel',
    icon: "/icons/hotel.svg"
  },
  {
    text:{
      en: "Tourism program design",
      ar:  'تصميم برنامج سياحي',
    },
    route: '/design-program',
    icon: "/icons/design.svg"
  },
  {
    text:{
      en: "Sea ​​tripes",
      ar:  'رحلات بحرية',
    },
    route: '/sea-tripes',
    icon: "/icons/boot.svg"
  },
  {
    text:{
      en: "Contact",
      ar:  'تواصل معنا',
    },
    route: '/contact',
    icon: "/icons/user.svg"
  },
  {
    text:{
      en: "About",
      ar:  'نبذه عنا',
    },
    route: '/about',
    icon: "/icons/info.svg"
  },
  // {
  //   text: 'شكر العملاء',
  //   route: '/thanks',
  //   icon: "/icons/hand.svg"
  // },
  {
    text:{
      en: "More Services",
      ar:  'خدمات اخري',
    },
    route: '/more',
    icon: "/icons/more.svg"
  }
]

const Menu = ({ showMenu, setShowMenu, setShowHeader, settings }) => {
  // const { showMenu, setShowMenu, setShowHeader, isSearch, settings } = props
  const router = useRouter()
  const [value, setValue] = useState(0)
  const en = useSelector((state) => state.langs.value)

  const changeBg = () => {
    if (window.scrollY >= 100) {
      setShowHeader(true)
    } else {
      setShowHeader(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeBg, { passive: true })
    return () => removeEventListener('scroll', changeBg, { passive: true })
  }, [])

  // Active Link
  useEffect(() => {
    const ac = new AbortController()
    headerLinks.forEach((link, i) => {
      setValue((val) =>
        router.pathname.split('/')[1] === link.route.split('/')[1] ? i : val
      )
    })
    return () => ac.abort()
  }, [router])

  // No Scroll when Menu Open
  // useEffect(() => {
  //   document.body.style.overflowY = showMenu || isSearch ? 'hidden' : 'visible'
  // }, [showMenu, isSearch])
  useEffect(() => {
    document.body.style.overflowY = showMenu ? 'hidden' : 'visible'
  }, [showMenu])

  // useEffect(() => {
  //   console.log(en);
  // }, [en])
  return (
    <div
      className={
        `menu relative ${showMenu
          ? `${styles.header__menu} ${styles.show__menu}`
          : styles.header__menu}`
      }
    >
      <div className="absolute top-0 left-0 -translate-y-16 flex gap-8 text-sm">
      <Link
          href={`mailto:${settings.email}`}
          target='_blank'
          rel='noreferrer'
          aria-label='Header menu link - Phone'
          className={`flex gap-2 bold items-center`}
          style={{ letterSpacing: "2px" }}
        >
          {settings.email}
          <FontAwesomeIcon icon={faEnvelopeOpenText} className='text-xl' />
          {/* <Image src="/icons/24-7.png" alt="phone" width={25} height={25} style={{ filter: 'invert(100%) sepia(6%) saturate(7477%) hue-rotate(324deg) brightness(99%) contrast(96%)' }} /> */}
        </Link>
      <Link
          href={`https://wa.me/${settings.whatsup}`}
          target='_blank'
          rel='noreferrer'
          aria-label='Header menu link - Phone'
          className={`flex gap-2 bold items-center`}
          style={{ letterSpacing: "2px" }}
        >
          {settings.phone}
          {/* <FontAwesomeIcon icon={faPhoneAlt} /> */}
          <Image src="/icons/24-7.png" alt="phone" width={25} className='object-contain' height={25} style={{ filter: 'invert(100%) sepia(6%) saturate(7477%) hue-rotate(324deg) brightness(99%) contrast(96%)' }} />
        </Link>
        <Link
          href={`https://wa.me/${settings.whatsup}`}
          target='_blank'
          rel='noreferrer'
          aria-label='Header menu link - Phone'
          className={`flex gap-2 bold items-center`}
          style={{ letterSpacing: "2px" }}
        >
          {settings.whatsup}+
          {/* <FontAwesomeIcon icon={faWhatsapp} className='text-xl' /> */}
          <Image src="/images/whatsapp.png" alt="phone" width={35} height={25}/>
        </Link>

      </div>
      {/* Header Links */}
      <ul className={styles.header__links}>
        {headerLinks.map((link, i) => {
          return (
            <li
              key={link.route}
              className={`${styles.header__li} ${i === value ? styles.active__link : ''
                }`}
              onClick={() => setShowMenu(false)}
            >
              {/* <link.icon /> */}
              {/* <span>{link.icon}</span> */}
              <Image
                src={link.icon}
                alt={link.text}
                width={20}
                height={20}
                className={`navicon ${styles.nav__icon}`}
              />
              <Link href={link.route} onClick={() => setValue(i)} className={styles.header__link}>
                {en ? link.text.en : link.text.ar}
              </Link>
            </li>
          )
        })}
      </ul>
      {/* Header Menu Data (Visible only on mobile) */}
      <div className={styles.header__social}>
        <a
          href={settings.youtube}
          target='_blank'
          rel='noreferrer'
          className={styles.youtube}
          aria-label='Header menu link - Youtube'
        >
          {/* <BsYoutube /> */}
          {/* <i className="fab fa-youtube"></i> */}
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a
          href={settings.twitter}
          target='_blank'
          rel='noreferrer'
          className={styles.twitter}
          aria-label='Header menu link - Twitter'
        >
          {/* <BsTwitter /> */}
          {/* <i className="fab fa-twitter"></i> */}
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href={settings.tiktok}
          target='_blank'
          rel='noreferrer'
          className={styles.tiktok}
          aria-label='Header menu link - Tiktok'
        >
          {/* <FaTiktok /> */}
          {/* <i className="fab fa-tiktok"></i> */}
          <FontAwesomeIcon icon={faTiktok} />
        </a>
        <a
          href={settings.snapchat}
          target='_blank'
          rel='noreferrer'
          className={styles.snapchat}
          aria-label='Header menu link - Snapchat'
        >
          {/* <BsSnapchat /> */}
          {/* <i className="fab fa-snapchat-ghost"></i> */}
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
        <a
          href={settings.instagram}
          target='_blank'
          rel='noreferrer'
          className={styles.instagram}
          aria-label='Header menu link - Instagram'
        >
          {/* <i className="fab fa-instagram"></i> */}
          <FontAwesomeIcon icon={faInstagram} />
          {/* <BsInstagram /> */}
        </a>
      </div>
      {/* Header Menu Footer (Visible only on mobile) */}
      <span className={`text-secondary dark:text-white ${styles.header__footer}`}>{en ? settings.copy_rights_en : settings.copy_rights.ar}</span>
      {/* <span className={`text-secondary dark:text-white ${styles.header__footer}`}>{settings.copy_rights}</span> */}
      <span
        id='menuClose'
        className={styles.header__close}
        onClick={() => setShowMenu(false)}
      >
        {/* <AiOutlineMinus /> */}
        <i className="w-6 h-1 bg-secondary dark:bg-white block"></i>
      </span>
      <div
        // className={
        //   isSearch || showMenu
        //     ? styles.logo__container__menu__show
        //     : styles.logo__container__menu__hide
        // }
        className={
          showMenu
            ? styles.logo__container__menu__show
            : styles.logo__container__menu__hide
        }
      >
        {settings.logo && (
          <Image
            src={"/images/logo.webp"}
            alt='logo'
            width={102}
            height={70}
            className={"object-cover"}
          />
        )}
      </div>
    </div>
  )
}

export default Menu
