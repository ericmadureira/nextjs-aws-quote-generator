import Image from "next/image"

import styles from './BackgroundImage.module.css'

// Assets
import dogbackground1 from "@/assets/dogbg1.png"
import dogbackground2 from "@/assets/dogbg2.png"

const BackgroundImage1 = () => (<Image src={dogbackground1} className={styles.dogbackground1} height='300' alt='dogbackground1' />)
const BackgroundImage2 = () => (<Image src={dogbackground2} className={styles.dogbackground2} height='300' alt='dogbackground2' />)

export { BackgroundImage1, BackgroundImage2 }
