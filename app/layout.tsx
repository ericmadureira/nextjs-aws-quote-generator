import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"

// Assets
import dogbackground1 from "@/assets/dogbg1.png"
import dogbackground2 from "@/assets/dogbg2.png"

// Styles
import "./globals.css"
import styles from "./layout.module.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inspirational Quote Generator",
  description: "Go further with drops of inspiration!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles['main-container']}>
          <Image src={dogbackground1} className={styles.dogbackground1} height='300' alt='dogbackground1' />
          <Image src={dogbackground2} className={styles.dogbackground2} height='300' alt='dogbackground2' />
          {children}
        </main>
      </body>
    </html>
  )
}
