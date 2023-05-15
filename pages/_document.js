import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@/components/favicon";

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
         </Head>
         <body dir="rtl" className="dark:bg-gray-950">
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
