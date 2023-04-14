import React, {useEffect} from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'

export default function Layout({ children, settings, countries, footerCountries }) {
   const dispatch = useDispatch()
   dispatch(setSettingsData(settings))
   useEffect(() => {
      if (document.fontadded) return
      document.fontadded = true
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
      document.head.appendChild(link)
   })
   return (
      <>
         <Header countries={countries} />
         {children}
         <Footer countries={footerCountries} />
      </>
   )
}
