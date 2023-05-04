// import { RiWhatsappLine } from 'react-icons/ri'
// import { AiFillPhone } from 'react-icons/ai'
// import styles from './index.module.css'
// import { useSelector } from 'react-redux'

// const FixedBtn = ({ mobile, whatsup }) => {
//   const settings = useSelector((state) => state.settings.value)
//   const message = `شكرا لك علي تواصلك مع وكالة وسام النجاح للسفر والسياحة`
//   return (
//     <div className={styles.fixed__btns}>
//       <a
//         href={`tel:${settings?.mobile}`}
//         target='_blank'
//         title='تواصل معنا عبر الجوال'
//         rel='noreferrer'
//         className={`${styles.fixed__btn} ${styles.phone}`}
//       >
//         {/* <AiFillPhone className={styles.fixed__btn__svg} /> */}
//         <i className="fas fa-phone-alt"></i>
//         <span>هاتف</span>
//       </a>
//       <a
//         href={`https://api.whatsapp.com/send?phone=${settings?.whatsup}&${message}`}
//         target='_blank'
//         title='تواصل معنا عبر واتساب'
//         rel='noreferrer'
//         className={`${styles.fixed__btn} ${styles.whats}`}
//       >
//         {/* <RiWhatsappLine className={styles.fixed__btn__svg} /> */}
//         <i className="fab fa-whatsapp"></i>
//         <span>واتساب</span>
//       </a>
//     </div>
//   )
// }

// export default FixedBtn
