import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@/components/favicon";

export default function Document() {
   return (
      <Html lang="ar">
         <Head>
            <meta property="og:type" content="website" />
            <link
               href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css"
               rel="stylesheet"
               type="text/css"
            />
            <meta
               property="og:image"
               content="https://backend.elnagahtravels.com/storage/settings/szKT4ynI1ZggowEi1MIgofP9DqYJswYog1g7wpRh.png"
            />
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta
               name="twitter:image"
               content="https://backend.elnagahtravels.com/storage/settings/szKT4ynI1ZggowEi1MIgofP9DqYJswYog1g7wpRh.png"
            />
            <Favicon />
         </Head>
         <body dir="rtl">
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
