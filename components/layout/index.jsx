import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'
import FixedBtn from '../fixedBtn'
import SocailMedia from '../socialMedia'


export default function Layout({ children, settings, countries, footerCountries }) {
   const dispatch = useDispatch()
   dispatch(setSettingsData(settings))
   return (
      <>
         <Header countries={countries} />
         {children}
         <SocailMedia />
         <FixedBtn />
         <Footer countries={footerCountries} />
      </>
   )
}
