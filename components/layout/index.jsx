import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'

export default function Layout({ children, settings, countries, footerCountries }) {
   const dispatch = useDispatch()
   dispatch(setSettingsData(settings))
   return (
      <>
         <Header countries={countries} />
         {children}
         <Footer countries={footerCountries} />
      </>
   )
}
