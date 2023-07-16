import styles from './index.module.css'
import { useSelector } from 'react-redux'

const ScrollDown = () => {
  const en = useSelector((state) => state.langs.value);
  return <div className={styles.scroll__down + " scrolldown"}>{en ? "Move the mouse down" : "حرك الفأرة لأسفل"}</div>
}

export default ScrollDown
