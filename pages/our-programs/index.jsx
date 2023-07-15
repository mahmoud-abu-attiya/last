/* eslint-disable no-undef */
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useEffect, lazy, Suspense } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'
// import dynamic from 'next/dynamic'
// import { WeatherWidget } from "@daniel-szulc/react-weather-widget"
// const WeatherWidget = dynamic(() => import("@daniel-szulc/react-weather-widget"))
// import Hero from '@/components/ProgramsHero'

const Hero = lazy(() => import('@/components/ProgramsHero'))

const Loading = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center relative'>
      <Image src='/images/placeholder.webp' alt='loading' fill priority />
    </div>
  )
}

const OurPrograms = ({ countries, slides }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
  }, [])
  const settings = useSelector(state => state.settings.value);
  return (
    <>
      <Head>
        <title>البرامج السياحية</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={settings.meta_description}
        />
        <meta property="og:title" content="البرامج السياحية" />
        <meta property="og:url" content="https://last-delta.vercel.app/our-programs" />
        <meta name="keywords" content={settings.keywords} />
        <meta
          property="og:description"
          content={settings.meta_description}
        />
        <meta name="twitter:title" content="البرامج السياحية" />
        <meta
          name="twitter:description"
          content={settings.meta_description}
        />
      </Head>
      {/* <FullPageSlider
        data={slides}
        title={slides[0]?.title}
      /> */}
      <Suspense fallback={<Loading />}>
        <Hero data={slides} />
      </Suspense>
      <div className={`bg-gray-100 dark:bg-gray-900`} id='content'>
        <div className="container">
          <div className=" border-b hidden md:block dark:border-gray-600">
            <Breadcrumbs list={[{ title: "البرامج السياحية" }]} />
          </div>
          <div className="py-12 md:py-20">
            <h2 className='main__title'>البرامج السياحية</h2>
            <p className='max-w-2xl text-justify mb-8 mx-auto dark:text-gray-300'> غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.  غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.</p>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-8`}>
              {countries.map((country) => ( // remove reverse() to egnore the error
                <Link
                  href="/our-programs/[place]"
                  as={`/our-programs/${country.id}`}
                  key={country.id} className={`h-[250px] group relative rounded-xl overflow-hidden`}>
                  <Image
                    fill
                    src={country.image}
                    alt={'country image'}
                    className={`object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out`}
                  />
                  <div className="absolute text-xs py-1 px-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-full top-4 left-4 z-10">تأشيرة سهلة</div>
                  <div className="flex flex-col gap-4 justify-end h-full w-full p-4 bg-gradient-to-t from-black/75 relative z-10 text-white to-transparent">
                    <h3 className='text-xl'>{country.name}</h3>
                    <div className="flex gap-2 items-center text-sm">
                      <span> الرياض</span>
                      <span className='h-1 w-1 bg-white rounded-full'></span>
                      <span> العلا</span>
                      <span className='h-1 w-1 bg-white rounded-full'></span>
                      <span> نيوم(تبوك)</span>
                      <span className='h-1 w-1 bg-white rounded-full'></span>
                      <span> جدة</span>
                      <span className='h-1 w-1 bg-white rounded-full'></span>
                      <span>9 ليال </span>
                    </div>
                    {/* <WeatherWidget
        autoLocate="gps" 
        /> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurPrograms

export async function getServerSideProps() {
  const [countryRes, slidesRes] = await Promise.all([
    fetch('https://backend.elnagahtravels.com/public/api/countries?country_for=programs').then(res => res.json()),
    fetch('https://backend.elnagahtravels.com/public/api/slides?page=programs').then(res => res.json()),
  ]);

  const countries = countryRes.countries;
  const slides = slidesRes.data.slide;

  return { props: { countries, slides } };
}