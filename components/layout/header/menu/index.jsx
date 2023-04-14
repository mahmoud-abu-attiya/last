import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'
import styles from '../Header.module.css'

export const headerLinks = [
  { text: 'الرئيسية', route: '/', icon: <i className="fas fa-home"></i> },
  { text: 'البرامج السياحية', route: '/our-programs', icon: <i className="fad fa-flag-checkered"></i> },
  {
    text: 'العروض المميزة',
    route: '/special-offers',
    icon: <i className="fas fa-bolt"></i>,
  },
  { text: 'الخصومات', route: '/sales', icon: <i className="fas fa-percent"></i> },
  { text: 'الطيران', route: '/aviation', icon: <i className="fas fa-plane"></i> },
  { text: 'حجز فنادق', route: '/book-hotel', icon: <i className="fas fa-hotel"></i>},
  {
    text: 'تصميم برنامج سياحي',
    route: '/design-program',
    icon: <i className="fas fa-pencil-ruler"></i>,
  },
  { text: 'رحلات بحرية', route: '/sea-tripes', icon: <i className="fas fa-ship"></i>},
  { text: 'تواصل معنا', route: '/contact-us', icon: <i className="fas fa-user-tag"></i> },
  { text: 'نبذه عنا', route: '/about-us', icon: <i className="fas fa-info"></i> },
  { text: 'شكر العملاء', route: '/thanks', icon: <i className="fas fa-handshake"></i> },
]

const Menu = (props) => {
  const { showMenu, setShowMenu, setShowHeader, isSearch, settings } = props
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
  }, [])

  // No Scroll when Menu Open
  useEffect(() => {
    document.body.style.overflowY = showMenu || isSearch ? 'hidden' : 'visible'
  }, [showMenu, isSearch])
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
              className={`${styles.header__li} ${
                i === value ? styles.active__link : ''
              }`}
              onClick={() => setShowMenu(false)}
            >
              {/* <link.icon /> */}
              <span>{link.icon}</span>
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
          href={settings?.youtube}
          target='_blank'
          rel='noreferrer'
          className={styles.youtube}
          aria-label='Header menu link - Youtube'
        >
          {/* <BsYoutube /> */}
        </a>
        <a
          href={settings?.twitter}
          target='_blank'
          rel='noreferrer'
          className={styles.twitter}
          aria-label='Header menu link - Twitter'
        >
          {/* <BsTwitter /> */}
        </a>
        <a
          href={settings?.tiktok}
          target='_blank'
          rel='noreferrer'
          className={styles.tiktok}
          aria-label='Header menu link - Tiktok'
        >
          {/* <FaTiktok /> */}
        </a>
        <a
          href={settings?.snapchat}
          target='_blank'
          rel='noreferrer'
          className={styles.snapchat}
          aria-label='Header menu link - Snapchat'
        >
          {/* <BsSnapchat /> */}
        </a>
        <a
          href={settings?.instagram}
          target='_blank'
          rel='noreferrer'
          className={styles.instagram}
          aria-label='Header menu link - Instagram'
        >
          {/* <BsInstagram /> */}
        </a>
      </div>
      {/* Header Menu Footer (Visible only on mobile) */}
      <span className={styles.header__footer}>جميع الحقوق محفوظة © 2022</span>
      <span
        id='menuClose'
        className={styles.header__close}
        onClick={() => setShowMenu(false)}
      >
        {/* <AiOutlineMinus /> */}
      </span>
      <div
        className={
          isSearch || showMenu
            ? styles.logo__container__menu__show
            : styles.logo__container__menu__hide
        }
      >
        {settings?.logo && (
          <Image
            src={props?.settings?.logo}
            alt='logo'
            width={102}
            height={70}
            layout='intrinsic'
          />
        )}
      </div>
    </div>
  )
}

export default memo(Menu)
