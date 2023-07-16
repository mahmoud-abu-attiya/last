import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const Breadcrumbs = ({ list }) => {
   const en = useSelector((state) => state.langs.value);
   return (
      <nav className="flex py-4" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-4">
            <li className="inline-flex items-center">
               <Link href={"/"} className="inline-flex text-primary items-center text-xs md:text-sm gap-4">
                  {en ? "Home" : "الرئيسية"}
                  {/* <i className="far fa-angle-left text-primary"></i> */}
                  <FontAwesomeIcon icon={faAngleLeft} className='text-primary' />
               </Link>
            </li>
            {list.map((item, i) => <li key={i} className="inline-flex items-center">
               <Link href={item.href || "#"} className={`inline-flex items-center text-xs md:text-sm gap-4 font-medium ${item.href ? "text-primary" : "text-gray-700 dark:text-gray-400"}`}>
                  {item.title}
                  {i !== list.length - 1 && <FontAwesomeIcon icon={faAngleLeft} className='text-primary' />}
               </Link>
            </li>)}
         </ol>
      </nav>
   )
}

export default Breadcrumbs