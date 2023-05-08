import Header from './header/Header'
import Footer from './footer/NewFooter'
import { useDispatch, useSelector } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'
import { setForProgramsData } from '../../slices/forPrograms'
import { useEffect } from 'react'


export default function Layout({ children, countries, footerCountries, settings }) {
   const dispatch = useDispatch()
   dispatch(setSettingsData(settings))
   dispatch(setForProgramsData(countries))
   const theme = useSelector((state) => state.theme.value);
   useEffect(() => {
      const theme = localStorage.theme;
      if (
         theme === true ||
         (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [theme]);
   return (
      <>
         <Header />
         {children}
         <Footer countries={footerCountries} />
      </>
   )
}
