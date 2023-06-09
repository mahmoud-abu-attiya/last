import Head from 'next/head';
import Image from 'next/image'
// import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { setBacktoData } from '@/slices/backto'
import { useEffect } from 'react';

export default function Index({ data }) {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(setBacktoData({ href: '/', title: 'الرئيسية' }))
   }, [])
   const settings = useSelector((state) => state.settings.value);
   const countries = data.countries;
   return (
      <>
         <Head>
            <title>الدليل السياحي</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="description"
               content={settings.meta_description}
            />
            <meta property="og:title" content="الدليل السياحي" />
            <meta property="og:url" content="https://last-delta.vercel.app/" />
            <meta name="keywords" content={settings.keywords} />
            <meta
               property="og:description"
               content={settings.meta_description}
            />
            <meta name="twitter:title" content="الدليل السياحي" />
            <meta
               name="twitter:description"
               content={settings.meta_description}
            />
         </Head>
         <div className='bg-gray-50 dark:bg-gray-900'>
            <div className="hidden md:block top h-20 md:h-44 bg-secondary w-full"></div>
            <div className='container max-w-7xl'>
               <div className="border-b hidden md:block dark:border-gray-700">
                  <Breadcrumbs list={[{ title: "الدليل السياحي" }]} />
               </div>
               <div className="py-12 md:py-20">
                  <h1 className='text-xl md:text-2xl mb-4 dark:text-white'>الدليل السياحي</h1>
                  <p className='text-gray-500 dark:text-gray-400'>اكتشف معنا أروع وجهات السفر</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
                     {countries.map((country) => (
                        <Link className='group overflow-hidden rounded-lg cursor-pointer' key={country.id} href={`/city-guides/${country.id}`}>
                           <div className='relative h-[250px] md:h-[370px] flex'>
                              <Image src={country.image} priority quality={50} fill alt={country.name} className='w-full group-hover:scale-110 transition duration-1000 object-cover rounded-lg' />
                              <div className='relative text-white w-full mt-auto bg-gradient-to-t from-black/75 to-transparent flex flex-col items-start md:items-center justify-end p-4 text-center'>
                                 <h2 className='text-xl'>{country.name}</h2>
                                 <p className="sup text-xs">متعة التسوّق، المأكولات الشهية والترفيه</p>
                              </div>
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

export async function getServerSideProps() {
   const mainRes = await fetch("https://backend.elnagahtravels.com/public/api/countries").then((res) => res.json())

   const data = mainRes;

   return { props: { data } };
}

