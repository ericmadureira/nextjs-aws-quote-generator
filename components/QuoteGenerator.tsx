import Link from 'next/link'

// styles
import styles from './QuoteGenerator.module.css'

const Title = () => <h1 className={styles.title}>ZenDog</h1>
const Subtitle = () => <h2 className={styles.subtitle}>Inspiring quotes Generator, provided by <Link href='https://zenquotes.io/' target='_blank' rel='noopener noreferrer'><span className={styles['api-link']}>ZenQuotes API</span></Link>.</h2>

export default function QuoteGenerator() {
  return (
    <div className={styles['container-card']}>
      <Title />
      <Subtitle />
    </div>
  )
}
