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

export default function Home({ data, programsCountries }) {
   const settings = useSelector((state) => state.settings.value);
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
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <title>وسام النجاح للسفر والسياحة</title>
            <meta
               name="description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta property="og:title" content="وسام النجاح للسفر والسياحة" />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
            <meta name="twitter:title" content="وسام النجاح للسفر والسياحة" />
            <meta
               name="twitter:description"
               content="وسام النجاح للسفر والسياحة دليل المسافر العربي الشامل للسياحة والسفر من أفضل الوجهات السياحية والأماكن والوجهات الخاصة بالأعياد والمناسبات وشهر العسل بالإضافة إلى نصائح..."
            />
         </Head>
         <Hero slides={slides} />
         <Programs data={latest_discounts} />
         <Success data={features} features_slides={features_slides} />
         <Tripes data={programsCountries} />
         <About data={about_wsam_elngah} />
         <Special data={special_offers} />
         <div className="spikes"></div>
         <Events event={event} />
         <NewPrograms programs={latest_programs} />
      </>
   );
}

export async function getServerSideProps() {
   const [mainRes, programsRes] = await Promise.all([
      fetch("https://backend.elnagahtravels.com/public/api/index").then((res) =>
         res.json()
      ),
      fetch(
         "https://backend.elnagahtravels.com/public/api/countries?country_for=programs"
      ).then((res) => res.json()),
   ]);

   const data = mainRes;
   const programsCountries = programsRes.countries;

   return { props: { data, programsCountries } };
}
