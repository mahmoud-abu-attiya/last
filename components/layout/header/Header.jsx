import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Menu from './menu'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMobile, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'


export default function Header({ countries }) {
  // const router = useRouter()
  const settings = useSelector((state) => state.settings.value)

  const [showHeader, setShowHeader] = useState(false) // to hide/show on scroll
  const [isScrollTop, setIsScrollTop] = useState(false) // to hide on scroll down, show on scroll up
  const [showMenu, setShowMenu] = useState(false) // to hide/show menu
  const [isSearch, setIsSearch] = useState(false) // to hide/show search page
  const [response, setResponse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // const onSearch = (event, searchTerm) => {
  //   event.preventDefault()
  //   setSearchTerm(searchTerm)
  //   if (
  //     countries.find(({ name }) => name === searchTerm).name !== undefined
  //   ) {
  //     router.push(`/our-programs/${searchTerm}`)
  //     setSearchTerm('')
  //     setResponse('')
  //     setIsSearch(false)
  //   } else {
  //     setResponse(' لا توجد نتائج')
  //   }
  // }
  // useEffect(() => {
  //   console.log(countries);
  // }, [countries])
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
              src="/images/logo.webp"
              alt='logo'
              width={120}
              height={85}
              priority={true}
              className={styles.header__logo}
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
              aria-label='Mobile'
            >
              {/* <i className="fas fa-mobile"></i> */}
              <FontAwesomeIcon icon={faMobile} />
            </a>
            <a
              href={`tel:${settings.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.phone}
              aria-label='Phone'
            >
              {/* <i className="fas fa-phone-rotary"></i> */}
              <FontAwesomeIcon icon={faPhoneAlt} />
            </a>
            <a
              href={`mailto:${settings.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mail}
              aria-label='Email'
            >
              {/* <i className="fas fa-envelope"></i> */}
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.whats}
              aria-label='Whatsapp'
            >
              {/* <i className="fab fa-whatsapp"></i> */}
              <FontAwesomeIcon icon={faWhatsapp} />
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
              <i className="w-6 h-1 bg-secondary block"></i>
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
                src="/images/logo.webp"
                priority={true}
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
              {/* <i className="far fa-search text-xl"></i> */}
              <FontAwesomeIcon icon={faSearch} className='text-xl' />
            </span>

            <span
              id='menuBtn'
              className={styles.header__menu__btn}
              onClick={() => setShowMenu(true)}
            >
              <span>القائمة</span>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="5" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="19" cy="5" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="19" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="19" cy="19" r="1"></circle></svg>
            </span>
          </div>
        )}
      </nav>
    </header>
  )
}
