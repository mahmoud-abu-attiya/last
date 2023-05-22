import { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero = ({ data }) => {
   const [activeIndex, setActiveIndex] = useState(0)
   const next = () => {
      if (activeIndex !== data.length + 1) {
         setActiveIndex(activeIndex + 1)
      } else {
         setActiveIndex(0)
      }
   }
   useEffect(() => {
      const interval = setTimeout(() => {
         next()
      }, 4000)
      return () => clearTimeout(interval)
   }, [activeIndex])
   return (
      <div className='h-[50vh] md:h-screen w-full overflow-hidden relative'>
         {data.map((slide, index) => {
            return (
               <div className={`transition duration-500 w-full h-full ${index === activeIndex ? "opacity-100" : "opacity-0"}`} key={index}>
                  <div className="absolute top-0 left-0 w-full h-screen bg-secondary/75 z-10"><span className='sr-only'>overlay</span></div>
                  <Image src={slide.image} alt="hero" fill className={`object-cover object-center hero-img transition duration-[10s] ease-linear scale-100 ${index === activeIndex && "scaleAmimation"}`} />
                  <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10 text-white">
                     <h2 className="text-xl md:text-2xl max-w-xl text-center">{slide.title}</h2>
                  </div>
               </div>
            )
         })}
         <div className={`transition duration-500 w-full h-full ${activeIndex === 2 ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 left-0 w-full h-screen bg-secondary/75 z-10"><span className='sr-only'>overlay</span></div>
            <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <video autoPlay={true} loop={true} muted playsInline={true} className="w-full h-full object-cover">
                  <source src="/videos/vid1.mp4" type="video/mp4" title="elnagah preview" description="elnagah preview" />Your browser does not support the video tag.
               </video>
            </div>
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10 text-white">
               <h2 className="text-xl md:text-2xl max-w-xl text-center">{data[0].title}</h2>
            </div>
         </div>
         <div className={`transition duration-500 w-full h-full ${activeIndex === 3 ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute top-0 left-0 w-full h-screen bg-secondary/75 z-10"><span className='sr-only'>overlay</span></div>
            <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <video autoPlay={true} loop={true} muted playsInline={true} className="w-full h-full object-cover">
                  <source src="/videos/vid2.mp4" type="video/mp4" title="elnagah preview" description="elnagah preview" />Your browser does not support the video tag.
               </video>
            </div>
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10 text-white">
               <h2 className="text-xl md:text-2xl max-w-xl text-center">{data[1].title}</h2>
            </div>
         </div>
      </div>
   )
}

export default Hero