import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faTwitter, faTiktok, faSnapchat, faInstagram } from '@fortawesome/free-brands-svg-icons'

export const headerLinks = [
  {
    text: 'الرئيسية',
    route: '/',
    icon: "/icons/home.svg"
  },
  {
    text: 'البرامج السياحية',
    route: '/our-programs',
    icon: "/icons/flag.svg"
  },
  {
    text: 'العروض المميزة',
    route: '/special-offers',
    icon: "/icons/thunder.svg"
  },
  {
    text: 'الدليل السياحي',
    route: '/city-guides',
    icon: "/icons/offer.svg"
  },
  {
    text: 'الطيران',
    route: '/aviation',
    icon: "/icons/plane.svg"
  },
  {
    text: 'حجز فنادق',
    route: '/book-hotel',
    icon: "/icons/hotel.svg"
  },
  {
    text: 'تصميم برنامج سياحي',
    route: '/design-program',
    icon: "/icons/design.svg"
  },
  {
    text: 'رحلات بحرية',
    route: '/sea-tripes',
    icon: "/icons/boot.svg"
  },
  {
    text: 'تواصل معنا',
    route: '/contact-us',
    icon: "/icons/user.svg"
  },
  {
    text: 'نبذه عنا',
    route: '/about-us',
    icon: "/icons/info.svg"
  },
  // {
  //   text: 'شكر العملاء',
  //   route: '/thanks',
  //   icon: "/icons/hand.svg"
  // },
]

const Menu = ({ showMenu, setShowMenu, setShowHeader, settings }) => {
  // const { showMenu, setShowMenu, setShowHeader, isSearch, settings } = props
  const router = useRouter()
  const [value, setValue] = useState(0)

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
  return (
    <div
      className={
        showMenu
          ? `${styles.header__menu} ${styles.show__menu}`
          : styles.header__menu
      }
    >
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
                className={styles.nav__icon}
              />
              <Link href={link.route} onClick={() => setValue(i)} className={styles.header__link}>
                {link.text}
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
      <span className={styles.header__footer}>{settings.copy_rights}</span>
      <span
        id='menuClose'
        className={styles.header__close}
        onClick={() => setShowMenu(false)}
      >
        {/* <AiOutlineMinus /> */}
        <i className="w-6 h-1 bg-secondary block"></i>
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
