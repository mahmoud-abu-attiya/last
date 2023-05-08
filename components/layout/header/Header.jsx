import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Menu from './menu'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { setTheme } from '../../../slices/themeSlice'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
// import { faSearch, faMobile, faPhoneAlt, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'


export default function Header() {
  // const router = useRouter()
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings.value)
  const forPrograms = useSelector((state) => state.forPrograms.value)

  const theme = useSelector((state) => state.theme.value);

  const setThemeValue = (theme) => {
    if (theme == "") {
      localStorage.removeItem("theme");
      dispatch(setTheme(""));
    } else {
      localStorage.theme = theme;
      dispatch(setTheme(theme));
    }
  };
  const [countries, setCounties] = useState()

  const [showHeader, setShowHeader] = useState(false) // to hide/show on scroll
  // const [isScrollTop, setIsScrollTop] = useState(false) // to hide on scroll down, show on scroll up
  const [showMenu, setShowMenu] = useState(false) // to hide/show menu
  const [isSearch, setIsSearch] = useState(false) // to hide/show search page
  const [response, setResponse] = useState('')
  // const [searchTerm, setSearchTerm] = useState('')

  // const [prevScrollPos, setPrevScrollPos] = useState(0);

  // const handleScroll = () => {
  //   const currentScrollPos = window.scrollY;
  //   if (currentScrollPos > prevScrollPos) {
  //     setIsScrollTop(true);
  //   } else {
  //     setIsScrollTop(false);
  //   }
  //   setPrevScrollPos(currentScrollPos);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  const onSearch = (event) => {
    event.preventDefault()
    const value = event.target.querySelector('input').value
    console.log(value);
    const result = forPrograms.filter(({ name }) => name.startsWith(value))
    setCounties(value ? result : setResponse(' لا توجد نتائج'))
    result.length !== 0 ? setResponse('') : setResponse(' لا توجد نتائج')
  }
  return (
    <header
      // className={`${styles.header} ${showHeader ? styles.active : ''} ${isScrollTop ? styles.hide : ''
      //   }`}
      className={`${styles.header} ${showHeader ? styles.active : ''}`}
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
              className={` object-cover ${styles.header__logo}`}
            />
          )}
        </Link>

        {/* Header Icons */}
        {/* {settings.logo && (
          <div className={styles.header__icons}>
            <a
              href={`tel:${settings.mobile}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mobile}
              aria-label='Mobile'
            >
              <FontAwesomeIcon icon={faMobile} />
            </a>
            <a
              href={`tel:${settings.phone}`}
              target='_blank'
              rel='noreferrer'
              className={styles.phone}
              aria-label='Phone'
            >
              <FontAwesomeIcon icon={faPhoneAlt} />
            </a>
            <a
              href={`mailto:${settings.email}`}
              target='_blank'
              rel='noreferrer'
              className={styles.mail}
              aria-label='Email'
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${settings.whatsup}`}
              target='_blank'
              rel='noreferrer'
              className={styles.whats}
              aria-label='Whatsapp'
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        )} */}
        {/* <Link
          href={`tel:${settings.phone}`}
          target='_blank'
          rel='noreferrer'
          aria-label='Header menu link - Phone'
          className={`flex gap-2 p-2 rounded-lg border bg-gray-800 border-gray-700`}
          style={{ letterSpacing: "2px" }}
        >
          {settings.phone}
          <Image src="/icons/24-7.png" alt="phone" width={25} height={25} style={{ filter: 'invert(70%) sepia(95%) saturate(529%) hue-rotate(360deg) brightness(104%) contrast(104%)' }} />
        </Link> */}
        <button
          className={`px-4 py-2 dark:bg-gray-200 bg-gray-950 rounded-md dark:text-gray-900 text-white border border-gray-800`}
          onClick={() => setThemeValue(!theme)}
          title={theme ? " المظهر الداكن" : "المظهر الفاتح"}>
          {theme ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </button>

        {/* Menu */}
        {settings.logo && (
          <Menu
            // setIsScrollTop={setIsScrollTop}
            setShowHeader={setShowHeader}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            isSearch={isSearch}
            settings={settings}
          // isScrollTop={isScrollTop}
          />
        )}
        {/* Search Page */}
        <div
          className={
            isSearch
              ? `bg-white dark:bg-gray-900 ${styles.header__search__menu} ${styles.show__search}`
              : styles.header__search__menu
          }
        >
          <form
            // onSubmit={(event) => onSearch(event, searchTerm)}
            onSubmit={(event) => onSearch(event)}
            className={styles.search__form}
          >
            <input
              type='text'
              placeholder='البحث'
              // value={searchTerm}
              onChange={() => {
                // setSearchTerm(event.target.value)
                setResponse('')
                // onSearch(event, event.target.value)
              }}
              className={`border-b focus:border-primary dark:bg-gray-900 dark:text-white dark:border-gray-700 ${styles.search__input}`}
            />
            <button type='submit' className={`text-secondary dark:text-white ${styles.search__btn}`}>
              ابحث
              {/* <BsArrowLeft /> */}
              <FontAwesomeIcon icon={faArrowLeft} />
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
              <i className="w-6 h-1 bg-secondary dark:bg-white block"></i>
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
                className={"object-cover"}
              />
            )}
          </div>
          <div className={`max-h-full overflow-y-auto dark:bg-gray-800 ${styles.dropdown}`}>
            {countries?.map(({ name, id }) => (
              <Link
                className={`dark:text-white text-secondary ${styles.dropdown__row}`}
                key={id}
                // onClick={() => { setSearchTerm(name); setIsSearch(false); }}
                onClick={() => setIsSearch(false)}
                href={`/our-programs/${id}`}
              >
                {name}
              </Link>
            ))}
            {response && <h2 style={{ zIndex: 4 }}>{response}</h2>}
          </div>
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
