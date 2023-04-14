import '@/styles/globals.css'
import Layout from '../components/layout'
import App from 'next/app'
import { store } from "../store";
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps, countries, footerCountries, settings }) {
  return (
    <Provider store={store}>
      <Layout countries={countries} footerCountries={footerCountries} settings={settings}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}



MyApp.getInitialProps = async (appContext) => {
  const [programsRes, settingsRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/countries'),
    fetch('https://backend.elnagahtravels.com/public/api/settings'),
  ])

  const [
    { countries = [] },
    { settings = {}, countries: footerCountries },
  ] = await Promise.all([programsRes.json(), settingsRes.json()])

  const appProps = await App.getInitialProps(appContext)

  return {
    ...appProps,
    countries,
    footerCountries,
    settings,
  }
}
