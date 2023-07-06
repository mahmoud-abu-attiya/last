import styles from './Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Menu from './menu'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
// import { faSearch, faMobile, faPhoneAlt, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'


export default function Header() {
  const settings = useSelector((state) => state.settings.value);
  const forPrograms = useSelector((state) => state.forPrograms.value);
  const backto = useSelector((state) => state.backto.value);
  const [countries, setCounties] = useState();

  const [showHeader, setShowHeader] = useState(false); // to hide/show on scroll
  // const [isScrollTop, setIsScrollTop] = useState(false) // to hide on scroll down, show on scroll up
  const [showMenu, setShowMenu] = useState(false); // to hide/show menu
  const [isSearch, setIsSearch] = useState(false); // to hide/show search page
  const [response, setResponse] = useState('');
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
    event.preventDefault();
    const value = event.target.querySelector('input').value;
    console.log(value);
    const result = forPrograms.filter(({ name }) => name.startsWith(value));
    setCounties(value ? result : setResponse(' لا توجد نتائج'));
    result.length !== 0 ? setResponse('') : setResponse(' لا توجد نتائج');
  };
  const search = (value) => {
    const result = forPrograms.filter(({ name }) => name.startsWith(value));
    setCounties(value ? result : setResponse(' لا توجد نتائج'));
    result.length !== 0 ? setResponse('') : setResponse(' لا توجد نتائج');
  };
  return (
    <>
    <header
      // className={`${styles.header} ${showHeader ? styles.active : ''} ${isScrollTop ? styles.hide : ''
      //   }`}
      className={`sticky md:fixed ${backto ? "pt-4" : "py-4"} ${styles.header} ${showHeader ? styles.active : ''}`}
    >
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href='/'>
          {settings.logo && (
            <Image
              // src="/images/logo2.webp"
              src={settings.logo}
              alt='logo'
              width={100}
              height={75}
              className={` object-cover ${styles.header__logo}`}
            />
          )}
        </Link>
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
              onChange={(e) => {
                // setSearchTerm(event.target.value)
                setResponse('')
                search(e.target.value)
              }}
              className={`border-b text-black focus:border-primary dark:bg-gray-900 dark:text-white dark:border-gray-700 ${styles.search__input}`}
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
                className={`dark:text-white text-secondary hover:bg-gray-300 dark:hover:bg-gray-900 ${styles.dropdown__row}`}
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
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: "1.7rem" }} />
            </span>

            <span
              id='menuBtn'
              className={styles.header__menu__btn}
              onClick={() => setShowMenu(true)}
            >
              <span>القائمة</span>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><desc></desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="5" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="19" cy="5" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="19" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="19" cy="19" r="1"></circle></svg>
            </span>
          </div>
        )}
      </nav>
    {backto && (<div className="backto w-full bg-secondary text-white px-4 py-2 mt-2">
      <Link href={backto.href} className='bold flex gap-3 items-center'>
        <FontAwesomeIcon icon={faArrowRight} className='text-xl' beat />
        {backto.title}
      </Link>
    </div>)}
    </header>
    </>
  )
}
