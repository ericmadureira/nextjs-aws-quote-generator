// libs
import Link from 'next/link'

// components
import GenerateQuoteButton from './GenerateQuoteButton'

// styles
import styles from './QuoteGenerator.module.css'

interface QuoteGeneratorProps {
  handleOpenModal: (e: React.SyntheticEvent) => void
  isQuoteLoading: boolean
}

const ZENQUOTES_URL = 'https://zenquotes.io/api'
const Title = () => <h1 className={styles.title}>ZenDog</h1>
const Subtitle = () => <h2 className={styles.subtitle}>Inspiring quotes Generator, provided by <Link href={ZENQUOTES_URL} target='_blank' rel='noopener noreferrer'><span className={styles['api-link']}>ZenQuotes API</span></Link>.</h2>

export default function QuoteGenerator({
  handleOpenModal,
  isQuoteLoading,
}: QuoteGeneratorProps) {
  return (
    <div className={styles['container-card']}>
      <Title />
      <Subtitle />
      <GenerateQuoteButton handleOpenModal={handleOpenModal} isQuoteLoading={isQuoteLoading} />
    </div>
  )
}
