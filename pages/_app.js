/* eslint-disable no-undef */
import '@/styles/globals.css'
import Layout from '../components/layout'
import App from 'next/app'
import { store } from "../store";
import { Provider } from 'react-redux';
import localFont from 'next/font/local';
import { useEffect } from 'react';
// import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router';
import Script from 'next/script';
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
  const router = useRouter();
  // const tagManagerArgs = {
  //    gtmId: `${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`,
  //  }
 
  //  useEffect(() => {
  //   TagManager.initialize(tagManagerArgs)
  //   window.dataLayer.push({
  //     event: 'pageview',
  //   })
  //  }, [])
   useEffect(() => {
    window.dataLayer?.push({
      event: "VirtualPageView",
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    });
   }, [pageProps]);
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
                  <Script id="google-tag-manager" strategy="afterInteractive">
               {`
               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-WKNWPR7');
               `}
            </Script>
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
