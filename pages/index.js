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
import { useEffect, useState } from "react";

export default function Home() {
   const settings = useSelector((state) => state.settings.value);
   const [features , setFeatures] = useState([])
   const [about_wsam_elngah , setAbout_wsam_elngah] = useState([])
   const [latest_programs , setLatest_programs] = useState([])
   const [event , setEvent] = useState({})
   const [special_offers , setSpecial_offers] = useState([])
   const [features_slides , setFeatures_slides] = useState([])
   const [latest_discounts , setLatest_discounts] = useState([])
   const [slides , setSlides] = useState([])
   useEffect(() => {
      fetch("https://backend.elnagahtravels.com/public/api/index").then(
         (res) => res.json()
      ).then(data => {
         console.log(data)
         setFeatures(data.features)
         setAbout_wsam_elngah(data.about_wsam_elngah)
         setLatest_programs(data.latest_programs)
         setEvent(data.event)
         setSpecial_offers(data.special_offers)
         setFeatures_slides(data.features_slides)
         setLatest_discounts(data.latest_discounts)
         setSlides(data.slides)
      }
      )
   } , [])
   useEffect(() => {
      console.log({features , about_wsam_elngah , latest_programs , event , special_offers , features_slides , latest_discounts , slides});
   }, [features , about_wsam_elngah , latest_programs , event , special_offers , features_slides , latest_discounts , slides]);
   // const {
   //    features = [],
   //    about_wsam_elngah = [],
   //    latest_programs = [],
   //    event = {},
   //    special_offers = [],
   //    features_slides = [],
   //    latest_discounts = [],
   //    slides = [],
   // } = data;
   return (
      <>
         <Head>
            <title>{settings?.meta_title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={settings?.meta_description} />
            <meta property="og:title" content={settings?.meta_title} />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings?.keywords} />
            <meta
               property="og:description"
               content={settings?.meta_description}
            />
            <meta name="twitter:title" content={settings?.meta_title} />
            <meta
               name="twitter:description"
               content={settings?.meta_description}
            />
         </Head>
         <Hero slides={slides} />
         <Programs data={latest_discounts} />
         <Success data={features} features_slides={features_slides} />
         <Tripes />
         <About data={about_wsam_elngah} />
         <Special data={special_offers} />
         <div className="spikes"></div>
         <Events event={event} />
         <NewPrograms programs={latest_programs} />
      </>
   );
}

// export async function getServerSideProps(context) {
//    const mainRes = await fetch(
//       "https://backend.elnagahtravels.com/public/api/index"
//    ).then((res) => res.json());

//    const data = mainRes;

//    context.res.setHeader(
//       "Cache-Control",
//       "public, max-age=31536000, immutable"
//    );

//    return { props: { data } };
// }
