import Header from './header/Header'
import Footer from './footer/Footer'
import { useDispatch } from 'react-redux'
import { setSettingsData } from '../../slices/settingsSlices'
import { useEffect, useState } from 'react'


export default function Layout({ children }) {
   const dispatch = useDispatch()
   const [footerCountries, setFooterCountries] = useState([])
   // dispatch(setSettingsData(settings))
   useEffect(() => {
      fetch('https://backend.elnagahtravels.com/public/api/settings')
         .then(res => res.json())
         .then(data => {
            console.log(data.settings);
            setFooterCountries(data.countries)
            dispatch(setSettingsData(data.settings))
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
