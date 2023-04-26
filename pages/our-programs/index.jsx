import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import FullPageSlider from '../../components/fullPageSlider'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Hero = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const next = () => {
    if (activeIndex !== data.length) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex])
  return (
    <div className='h-screen w-full overflow-hidden relative'>
      {data.map((slide, index) => {
        return (
          <div className={`transition duration-500 w-full h-full ${index === activeIndex ? "opacity-100" : "opacity-0"}`} key={index}>
            <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-10"><span className='sr-only'>overlay</span></div>
            <Image src={slide.image} alt="hero" fill className={`object-cover hero-img transition duration-[10s] ease-linear ${index === activeIndex ? " scale-125" : "scale-100"}`} />
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10 text-white">
              <h2 className="text-xl md:text-2xl max-w-xl text-center">{slide.title}</h2>
            </div>
          </div>
        )
      })}
      <div className={`transition duration-500 w-full h-full ${activeIndex === 2 ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-10"><span className='sr-only'>overlay</span></div>
            <Image src={"/images/travel.gif"} alt="hero" fill className={`object-cover`} />
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10 text-white">
              <h2 className="text-xl md:text-2xl max-w-xl text-center">{data[0].title}</h2>
            </div>
          </div>
    </div>
  )
}

const OurPrograms = ({ countries, slides }) => {
  const settings = useSelector(state => state.settings.value);
  useEffect(() => {
    console.log(countries);
  }, [])
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
      <Hero data={slides} />
      <div className={`bg-gray-100 ${styles.programs__content}`} id='content'>
        <h2 className='main__title'>البرامج السياحية</h2>
        <p className='max-w-2xl text-center mb-8'> غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.  غينيا واستمر العصبة ضرب قد. وباءت الأمريكي الأوربيين هو به،, هو العالم، الثقيلة بال. مع وايرلندا الأوروبيّون كان, قد بحق أسابيع العظمى واعتلاء. انه كل وإقامة المواد.</p>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container lg:px-8`}>
          {countries.map((country) => ( // remove reverse() to egnore the error
            <Link
              href="/our-programs/[place]"
              as={`/our-programs/${country.id}`}
              key={country.id} className={`h-[250px] group relative rounded-xl overflow-hidden`}>
              <Image
                fill
                src={country.image}
                alt={'country image'}
                className={`object-cover group-hover:scale-110 transition-all duration-500 ease-in-out`}
              />
              <div className="flex flex-col gap-4 justify-end h-full w-full p-4 bg-gradient-to-t from-black/75 relative z-10 text-white to-transparent">
                <h3 className='text-xl'>{country.name}</h3>
                {/* {type == "out" ?
                      (<i className="fas fa-plane-alt"></i> country.type
                     : 
                      (<i className="fas fa-taxi"></i> country.type)
                    } */}
                {/* {country.type == "out" ?
                      <div className='flex gap-4 items-center'><i className="fas fa-plane-alt md:text-xl -rotate-45"></i>{country.type}</div>
                     :  
                      <div className='flex gap-4 items-center'><i className="fas fa-taxi md:text-xl"></i>{country.type}</div>
                      } */}
                <div class="flex gap-2 items-center text-sm">
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
              </div>
            </Link>
          ))}
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