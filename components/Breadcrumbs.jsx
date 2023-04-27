import React from 'react'
import Link from 'next/link'

const Breadcrumbs = ({ list }) => {
   return (
      <nav className="flex py-4" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-4">
            <li className="inline-flex items-center">
               <Link href={"/"} className="inline-flex text-primary items-center text-xs md:text-sm gap-4 hover:text-blue-600">
                  الرئيسية
                  <i className="far fa-angle-left text-primary"></i>
               </Link>
            </li>
            {list.map((item, i) => <li key={i} className="inline-flex items-center">
               <Link href={item.href || "#"} className={`inline-flex items-center text-xs md:text-sm gap-4 font-medium ${item.href ? "text-primary" : "text-gray-700"} hover:text-blue-600`}>
                  {item.title}
                  {i !== list.length - 1 && <i className="far fa-angle-left text-primary"></i>}
               </Link>
            </li>)}
         </ol>
      </nav>
   )
}

export default Breadcrumbs