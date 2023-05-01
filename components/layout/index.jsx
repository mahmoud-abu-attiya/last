import Header from './header/Header'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'
import { setForProgramsData } from '../../slices/forPrograms'
import { useEffect, useState } from 'react'


export default function Layout({ children }) {
   const dispatch = useDispatch()
   const [footerCountries, setFooterCountries] = useState([])
   // dispatch(setSettingsData(settings))
   useEffect(() => {
      fetch('https://backend.elnagahtravels.com/public/api/settings')
         .then(res => res.json())
         .then(data => {
            setFooterCountries(data.countries)
            dispatch(setSettingsData(data.settings))
         }
         )
      fetch('https://backend.elnagahtravels.com/public/api/countries?country_for=programs')
         .then(res => res.json())
         .then(data => {
            dispatch(setForProgramsData(data.countries))
         }
         )
   }, [])
   return (
      <>
         <Header />
         {children}
         <Footer countries={footerCountries} />
      </>
   )
}
