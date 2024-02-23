'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GraphQLResult } from 'aws-amplify/api'

import { quotesQueryName } from '@/src/graphql/queries'
import amplifyAPI from '@/amplify-client'

import styles from './Footer.module.css'

interface UpdateGeneratedQuotes{
  id: string
  queryName: string
  quotesGenerated: number
  createdAt: string
  updatedAt: string
}

// Type guard
function isGraphQLResultForQuotes(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateGeneratedQuotes]
  }
}>{
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items
}

export default function Footer() {
  const [generatedQuotes, setGeneratedQuotes] = useState<number | null>(null)

  const updateGeneratedQuotes = async () => {
    try {
      const response = await amplifyAPI.graphql<UpdateGeneratedQuotes>({
        query: quotesQueryName,
        authMode: "iam",
        variables: {
          queryName: "LIVE"
        }
      })

      if(!isGraphQLResultForQuotes(response)) {
        throw new Error("Unexpected response from API.graphql")
      }

      if(!response.data){
        throw new Error("Response data is undefined")
      }

      const receivedQuotesCount = response.data.quotesQueryName.items[0].quotesGenerated
      setGeneratedQuotes(receivedQuotesCount)
    } catch (error) {
      console.log("Error updating generated quotes:", error)
    }
  }

  useEffect(() => {
    updateGeneratedQuotes()
  }, [])

  return (
    <div className={styles['footer-container']}>
      Quotes generated: {generatedQuotes}
      <br />
      Developed with 🧠 by <Link href="https://www.linkedin.com/in/eric-madureira/" target="_blank" rel="noopener noreferrer">Eric Madureira</Link>
    </div>
  )
}
