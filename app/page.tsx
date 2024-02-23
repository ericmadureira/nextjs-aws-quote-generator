'use client'
import React, { useState } from 'react'
import { Amplify } from 'aws-amplify'

import amplifyconfig from '@/src/amplifyconfiguration.json'
import QuoteGenerator from '@/components/QuoteGenerator'
import QuoteResultModal from '@/components/QuoteResultModal'

Amplify.configure(amplifyconfig)

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(true)
  const [receivedQuote, setReceivedQuote] = useState<string | null>(null)
  const [blobURL, setBlobURL] = useState<string | null>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleOpenModal = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    setIsQuoteLoading(true)
    try {
      // Run lambda function
      // setIsQuoteLoading(false)
    } catch (error) {
      console.log('Error while generating quote:', error)
      setIsQuoteLoading(false)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    if (typeof blobURL === 'string') {
      link.href = blobURL
      link.download = 'quote.png'
      link.click()
    }
  }

  return (
    <div>
      <QuoteGenerator
        handleOpenModal={handleOpenModal}
        isQuoteLoading={isQuoteLoading}
        // setReceivedQuote={setReceivedQuote}
      />
      <QuoteResultModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isQuoteLoading={isQuoteLoading}
        receivedQuote={receivedQuote}
        handleDownload={handleDownload}
      />
    </div>
  )
}
