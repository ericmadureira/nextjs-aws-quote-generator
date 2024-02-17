import styles from './Footer.module.css'

interface FooterProps {
  children: React.ReactNode
}

export default function Footer({ children }: FooterProps) {
  return (
    <div className={styles['footer-container']}>
      {children}
    </div>
  )
}
