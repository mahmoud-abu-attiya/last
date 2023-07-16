import Hero from "@/components/hero/Hero";
import Programs from "@/components/Programs";
import Success from "@/components/success/Success";
import Tripes from "@/components/tripes/Tripes";
import About from "@/components/about/About";
import Special from "@/components/special/Special";
import Events from "@/components/events/Events";
import NewPrograms from "@/components/newPrograms/NewPrograms";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto';
import { useEffect } from 'react';

export default function Home({ data }) {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(setBacktoData(false))
   }, []);
   const settings = useSelector((state) => state.settings.value);
   const en = useSelector((state) => state.langs.value);
   const {
      features = [],
      about_wsam_elngah = [],
      latest_programs = [],
      event = {},
      special_offers = [],
      features_slides = [],
      latest_discounts = [],
      slides = [],
   } = data;
   return (
      <>
         <Head>
            <title>{settings.meta_title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={settings.meta_description} />
            <meta property="og:title" content={settings.meta_title} />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content={settings.meta_title} />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
         </Head>
         <Hero slides={slides} />
         <Programs data={latest_discounts} en={en} />
         <Success data={features} features_slides={features_slides} en={en} />
         <Tripes en={en} />
         <About data={about_wsam_elngah} en={en} />
         <Special data={special_offers} en={en} />
         <Events event={event} en={en} />
         <NewPrograms programs={latest_programs} en={en} />
      </>
   );
}

export async function getServerSideProps(context) {
   const mainRes = await fetch(
      "https://backend.elnagahtravels.com/public/api/index"
   ).then((res) => res.json());

   const data = mainRes;

   context.res.setHeader(
      "Cache-Control",
      "public, max-age=31536000, immutable"
   );

   return { props: { data } };
}
