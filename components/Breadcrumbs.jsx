import React from 'react'
import Link from 'next/link'

const Breadcrumbs = ({ list }) => {
   return (
      <nav className="flex border-b py-4" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-4">
            {list.map((item, i) => <li key={i} className="inline-flex items-center">
               <Link href="#" className="inline-flex items-center text-xs md:text-sm gap-4 font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  {item}
                  {i !== list.length - 1 && <i className="far fa-angle-left text-primary"></i>}
               </Link>
            </li>)}
         </ol>
      </nav>


   )
}

export default Breadcrumbs