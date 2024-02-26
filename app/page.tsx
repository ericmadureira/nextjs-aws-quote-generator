'use client'
import React, { useState } from 'react'
import { Amplify } from 'aws-amplify'

import amplifyconfig from '@/src/amplifyconfiguration.json'
import QuoteGenerator from '@/components/QuoteGenerator'
import QuoteResultModal from '@/components/QuoteResultModal'
import amplifyAPI from '@/amplify-client'
import { generateQuote } from '@/src/graphql/queries'

Amplify.configure(amplifyconfig)

const BLOB_START_INDEX = 87
const BLOB_END_INDEX = -23

interface GenerateQuoteData {
  generateQuote: {
    statusCode: number
    headers: { [key: string]: string}
    body: string
  }
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false)
  const [blobURL, setBlobURL] = useState<string | null>(null)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleOpenModal = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    setIsQuoteLoading(true)

    // Run lambda function
    try {
      const runStringfiedFunction = JSON.stringify('runFunction')
      const response = await amplifyAPI.graphql<GenerateQuoteData>({
        query: generateQuote,
        authMode: "iam",
        variables: {
          input: runStringfiedFunction
        }
      })

      const base64String = response.data.generateQuote.slice(BLOB_START_INDEX, BLOB_END_INDEX)
      const blobSourceURL = `data:image/png;base64, ${base64String}`
      setBlobURL(blobSourceURL)
      setIsQuoteLoading(false)
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
      />
      <QuoteResultModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isQuoteLoading={isQuoteLoading}
        blobURL={blobURL}
        handleDownload={handleDownload}
      />
    </div>
  )
}
