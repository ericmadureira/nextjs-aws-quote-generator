import Link from 'next/link'

import styles from './Footer.module.css'

interface FooterProps {
  generatedQuotes: number | null
}

export default function Footer({ generatedQuotes }: FooterProps) {
  return (
    <div className={styles['footer-container']}>
      Quotes generated: {generatedQuotes}
      <br />
      Developed with 🧠 by <Link href="https://www.linkedin.com/in/eric-madureira/" target="_blank" rel="noopener noreferrer">Eric Madureira</Link>
    </div>
  )
}
