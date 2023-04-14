import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Menu from './menu'
import { useSelector } from 'react-redux'


export default function Header({ countries }) {
  const router = useRouter()
  const settings = useSelector((state) => state.settings.value)

  const [showHeader, setShowHeader] = useState(false) // to hide/show on scroll
  const [isScrollTop, setIsScrollTop] = useState(false) // to hide on scroll down, show on scroll up
  const [showMenu, setShowMenu] = useState(false) // to hide/show menu
  const [isSearch, setIsSearch] = useState(false) // to hide/show search page
  const [response, setResponse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Show when scroll Up, Hide when scroll Down
  useEffect(() => {
    const scrollFuc = () => {
      if (lastScrollTop < window.scrollY) {
        setIsScrollTop(true)
      } else {
        setIsScrollTop(false)
      }
    }
    let lastScrollTop = window.scrollY
    window.addEventListener(
      'scroll',
      scrollFuc(),
      // throttle(scrollFuc(), 150),
      { passive: true }
    )
    return () =>
      removeEventListener(
        'scroll',
        scrollFuc(),
        // throttle(scrollFuc(), 150),
        { passive: true }
      )
  }, [])

  const onSearch = (event, searchTerm) => {
    event.preventDefault()
    setSearchTerm(searchTerm)
    if (
      countries?.find(({ name }) => name === searchTerm)?.name !== undefined
    ) {
      router.push(`/our-programs/${searchTerm}`)
      setSearchTerm('')
      setResponse('')
      setIsSearch(false)
    } else {
      setResponse(' لا توجد نتائج')
    }
  }
  return (
    <header
      className={`${styles.header} ${showHeader ? styles.active : ''} ${isScrollTop ? styles.hide : ''
        }`}
    >
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href='/'>
          {settings.logo && (
            <Image
              src={settings.logo}
              alt='logo'
              width={102}
              height={70}
              priority={true}
              className={styles.header__logo}
              sizes="(max-width: 68px) 100vw,
                (max-width: 200px) 50vw,
                33vw"
            />
          )}
        </Link>

        {/* Header Icons */}
        {settings.logo && (
          <div className={styles.header__icons}>
            <a
              href={`tel:${settings.mobile}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mobile}
            >
              {/* <AiFillMobile title='تواصل معنا عبر الجوال' /> */}
              {/* <i className="fas fa-mobile"></i> */}
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>تواصل معنا عبر الجوال</title><path d="M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64zM512 824c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"></path></svg>
            </a>
            <a
              href={`tel:${settings.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.phone}
            >
              {/* <GiRotaryPhone title='تواصل معنا عبر الهاتف الارضي' /> */}
              {/* <i className="fas fa-phone-rotary"></i> */}
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>تواصل معنا عبر الهاتف الارضي</title><path d="M256 92.6c-69.6-.1-139.1 11.6-208.56 35.4 0 0-9.87 22.6-17.98 41.3a46.9 46.9 0 0 0-3.49 12.2c48.55-18.4 97.13-31 145.63-38 4.5-8.8 13.7-14.6 23.9-14.6h17.3c7.9 0 15.1 3.4 20.1 8.9 15.4-.6 30.8-.7 46.4-.1 4.9-5.5 12.1-8.8 19.8-8.8h17.3c10.1 0 19.1 5.6 23.7 14.1 48.7 6.6 97.2 19.4 145.9 38.3-.7-4-1.8-8.2-3.5-12-8.1-18.7-18-41.3-18-41.3-69.5-23.4-139-35.33-208.5-35.4zm-60.5 53.6c-4.7 0-8.8 3.4-9.6 8.1l-6.7 40.4c-12.1 2.2-23.9 5-35.3 8.4-9.8 3-17.6 10.4-21.2 19.9-13.8 37-48.72 130.6-48.72 130.6H438s-34.8-93.5-48.7-130.6c-3.5-9.5-11.4-17-21.2-19.9-11.4-3.4-23.2-6.2-35.3-8.4l-6.8-40.4c-.8-4.7-4.8-8.1-9.6-8.1h-17.3c-4.6 0-8.7 3.2-9.5 7.8l-2.2 10.6h-62.9l-2.2-10.6c-.8-4.6-4.8-7.8-9.5-7.8zm163.8 17.3-2.7 18.6c5.6 1.4 11.1 2.8 16.4 4.5 14 6.2 25.7 15.7 31.1 27.2l64.8 15.5c6.4-9.8 13.6-18.7 16.3-29.8-42-16.6-83.9-28.7-125.9-36zm-206.5.5c-42 7.5-84.01 19.4-126.02 35.6 3.05 11.7 9.6 19.6 16.31 29.7l64.81-15.5c5.9-13 17.2-23 31-27.2 5.5-1.6 11-3.1 16.5-4.5zM256 197.3c44.7 0 81 30.9 81 69s-36.3 68.9-81 68.9-81.1-30.8-81.1-68.9c0-38.1 36.4-69 81.1-69zm0 17.6c-30.1 0-54.5 20.8-54.5 46.4 0 25.6 24.4 46.4 54.5 46.4s54.4-20.8 54.4-46.4c0-25.6-24.3-46.4-54.4-46.4zM73.97 376.5l21.76 42.9H416.2l21.7-42.9z"></path></svg>
            </a>
            <a
              href={`mailto:${settings.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mail}
            >
              {/* <BsEnvelopeFill title='تواصل معنا عبر البريد الالكتروني' /> */}
              {/* <i className="fas fa-envelope"></i> */}
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>تواصل معنا عبر البريد الالكتروني</title><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"></path></svg>
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.whats}
            >
              {/* <BsWhatsapp title='تواصل معنا عبر الواتساب' /> */}
              {/* <i className="fab fa-whatsapp"></i> */}
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title>تواصل معنا عبر الواتساب</title><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path></svg>
            </a>
          </div>
        )}

        {/* Menu */}
        {settings.logo && (
          <Menu
            setIsScrollTop={setIsScrollTop}
            setShowHeader={setShowHeader}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            isSearch={isSearch}
            settings={settings}
            isScrollTop={isScrollTop}
          />
        )}
        {/* Search Page */}
        <div
          className={
            isSearch
              ? `${styles.header__search__menu} ${styles.show__search}`
              : styles.header__search__menu
          }
        >
          <form
            onSubmit={(event) => onSearch(event, searchTerm)}
            className={styles.search__form}
          >
            <input
              type='text'
              placeholder='البحث'
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setResponse('')
              }}
              className={styles.search__input}
            />
            <button type='submit' className={styles.search__btn}>
              ابحث
              {/* <BsArrowLeft /> */}
            </button>
          </form>
          {isSearch && (
            <span
              className={styles.search__close}
              onClick={() => {
                setIsSearch(false)
                setResponse('')
              }}
            >
              {/* <IoMdClose /> */}
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path></svg>
            </span>
          )}
          <div
            className={
              isSearch || showMenu
                ? styles.logo__container__menu__show
                : styles.logo__container__menu__hide
            }
          >
            {settings.logo && (
              <Image
                src={settings.logo}
                alt='logo'
                width={102}
                height={70}
              />
            )}
          </div>
          <div className={styles.dropdown}>
            {countries.filter(
              ({ name }) =>
                searchTerm &&
                name.startsWith(searchTerm) &&
                name !== searchTerm
            )
              .map(({ name }) => (
                <div
                  className={styles.dropdown__row}
                  key={name}
                  onClick={() => setSearchTerm(name)}
                >
                  {name}
                </div>
              ))}
          </div>
          <h2 style={{ color: 'black', zIndex: 4 }}>{response}</h2>
        </div>

        {/* Header End */}
        {settings.logo && (
          <div className={styles.header__end}>
            <span
              className={styles.header__search}
              onClick={() => setIsSearch(true)}
            >
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
            </span>

            <span
              id='menuBtn'
              className={styles.header__menu__btn}
              onClick={() => setShowMenu(true)}
            >
              <span>القائمة</span>
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="5" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="19" cy="5" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="19" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="19" cy="19" r="1"></circle></svg>
            </span>
          </div>
        )}
      </nav>
    </header>
  )
}
