import '@/styles/globals.css'
import Layout from '../components/layout'
import App from 'next/app'
import { store } from "../store";
import { Provider } from 'react-redux';
import localFont from 'next/font/local';
// import { useEffect } from 'react';
// import TagManager from 'react-gtm-module'
// import Script from 'next/script';
import '@fortawesome/fontawesome-svg-core/styles.css'


const bukra = localFont({
   src: [
     {
       path: '../public/fonts/bukraregular.otf',
       weight: '400',
       style: 'normal',
     },
     {
       path: '../public/fonts/bukrabold.otf',
       weight: '700',
       style: 'normal',
     },
   ],
 })
 export default function MyApp({ Component, pageProps, countries, footerCountries, settings }) {
  // const tagManagerArgs = {
  //    gtmId: `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`,
  //  }
 
  //  useEffect(() => {
  //   TagManager.initialize(tagManagerArgs)
  //   window.dataLayer.push({
  //     event: 'pageview',
  //   })
  //  }, [])
  return (
    <>
    {/* <Script
        id='gtm'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script id='gtm2' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
          });
        `}
      </Script> */}
    <style jsx global>{`
        html {
          font-family: ${bukra.style.fontFamily};
        }
      `}</style>
    <Provider store={store}>
      <Layout countries={countries} footerCountries={footerCountries} settings={settings}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  )
}



MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext
  const [programsRes, settingsRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/countries'),
    fetch('https://backend.elnagahtravels.com/public/api/settings'),
  ])

  const [
    { countries = [] },
    { settings = {}, countries: footerCountries },
  ] = await Promise.all([programsRes.json(), settingsRes.json()])

  ctx.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

  const appProps = await App.getInitialProps(appContext)

  return {
    ...appProps,
    countries,
    footerCountries,
    settings,
  }
}
