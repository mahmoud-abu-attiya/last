import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@/components/favicon";
import Script from "next/script";

export default function Document() {
   return (
      <Html lang="ar">
         <Head>
            <meta charSet="utf-8" />
            <meta property="og:type" content="website" />
            <meta
               property="og:image"
               content="https://backend.elnagahtravels.com/storage/settings/szKT4ynI1ZggowEi1MIgofP9DqYJswYog1g7wpRh.png"
            />
            <meta name="author" content="Wesam Elnagah" />
            <meta property="og:site_name" content="Elnagah Travel" />
            <meta property="og:locale" content="ar_AR" />
            <meta name="twitter:card" content="summary" />
            <meta
               name="twitter:image"
               content="https://backend.elnagahtravels.com/storage/settings/szKT4ynI1ZggowEi1MIgofP9DqYJswYog1g7wpRh.png"
            />
            <Favicon />
            <meta name="robots" content="index, follow" /> {/*not global*/}
            {/* for snapchat */}
            {/* <meta
               property="snapchat:sticker"
               content="https://kit.snapchat.com/ckweb/test/image.png"
            />
            <meta property="snapchat:app_id" content="YOUR_APP_ID_HERE" />
            <meta
               property="snapchat:publisher_id"
               content="YOUR_PUBLISHER_ID_HERE"
            /> */}
            {/* for facebook */}
            {/* fb:app_id – for linking to a Facebook application (e.g., FB Comments) with the object
            <meta property="fb:admins" content="USER_ID"/>
            <meta property="fb:app_id" content="APP_ID"/>
            */}
            <Script id="google-tag-manager" strategy="afterInteractive">
               {`
               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-W4V2HT3');
               `}
            </Script>
         </Head>
         <body dir="rtl" className="dark:bg-gray-950">
            <Main />
            <NextScript />
            <noscript
               dangerouslySetInnerHTML={{
                  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W4V2HT3" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
               }}
            />
         </body>
      </Html>
   );
}
