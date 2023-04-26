import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Index({ data }) {
   const countries = data.countries;
   const router = useRouter();
   const handleClick = (id) => {
      router.push(`/our-programs/${id}`)
   }
   return (
      <div className='bg-gray-50'>
         <div className="top h-36 md:h-44 bg-secondary w-full"></div>
         <div className='container py-16 md:py-20 max-w-7xl'>
            <h1 className='text-xl md:text-2xl mb-6'>الدليل السياحي</h1>
            <p className='text-gray-500'>اكتشف معنا أروع وجهات السفر</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-16">
               {countries.map((country) => (
                  <div className='group overflow-hidden rounded-lg cursor-pointer' key={country.id} onClick={() => handleClick(country.id)}>
                     <div className='relative h-[250px] md:h-[370px] flex'>
                        <Image src={country.image} fill alt={country.name} className='w-full group-hover:scale-110 transition duration-500 object-cover rounded-lg' />
                        <div className='relative text-white w-full mt-auto bg-gradient-to-t from-black/75 to-transparent flex flex-col items-start md:items-center justify-end p-4 text-center'>
                           <h2 className='text-xl'>{country.name}</h2>
                           <p className="sup text-xs">متعة التسوّق، المأكولات الشهية والترفيه</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export async function getServerSideProps() {
   const mainRes = await fetch("https://backend.elnagahtravels.com/public/api/countries").then((res) => res.json())

   const data = mainRes;

   return { props: { data } };
}

