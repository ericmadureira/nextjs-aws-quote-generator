import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Link from "next/link"

// Components
import Footer from "@/components/Footer"
import { BackgroundImage1,BackgroundImage2 } from "@/components/BackgroundImage"

// Styles
import "./globals.css"
import styles from "./layout.module.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zen Dog - Inspirational Quote Generator",
  description: "Go further with drops of inspiration!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const generatedQuotes = 0

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles['main-container']}>
          {children}
          <BackgroundImage1 />
          <BackgroundImage2 />
          <Footer generatedQuotes={generatedQuotes} />
        </main>
      </body>
    </html>
  )
}
