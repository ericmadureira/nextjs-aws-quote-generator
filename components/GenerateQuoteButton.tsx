'use client'
import styles from './GenerateQuoteButton.module.css'

interface GenerateQuoteButtonProps {
  handleOpenModal: (e: React.SyntheticEvent) => void
  isQuoteLoading: boolean
}

export default function GenerateQuoteButton({
  handleOpenModal,
  isQuoteLoading,
}: GenerateQuoteButtonProps) {
  return (
    <button className={styles['generate-quote-button']} onClick={handleOpenModal}>
      { isQuoteLoading ? 'Loading...' : 'Make a Quote'}
    </button>
  )
}
