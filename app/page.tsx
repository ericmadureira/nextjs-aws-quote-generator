'use client'
import { useEffect, useState } from "react"
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

import amplifyconfig from '@/src/amplifyconfiguration.json'
import { quotesQueryName } from "@/src/graphql/queries"
import QuoteGenerator from '@/components/QuoteGenerator'
import Footer from "@/components/Footer"

interface UpdateGeneratedQuotes{
  id: string
  queryName: string
  quotesGenerated: number
  createdAt: string
  updatedAt: string
}

Amplify.configure(amplifyconfig)
const amplifyAPI = generateClient()

export default function Home() {
  const [generatedQuotes, setGeneratedQuotes] = useState<number | null>(0)

  const updateGeneratedQuotes = async () => {
    try {
      const response = await amplifyAPI.graphql<UpdateGeneratedQuotes>({
        query: quotesQueryName,
        authMode: "iam",
        variables: {
          queryName: "LIVE"
        }
      })
      console.log("response", response)
      // setGeneratedQuotes(response.data?.quotesQueryName?.quotesGenerated)
    } catch (error) {
      console.log("Error updating generated quotes:", error)
    }
  }

  useEffect(() => {
    updateGeneratedQuotes()
  }, [])

  return (
    <div>
      <QuoteGenerator />
      <Footer generatedQuotes={generatedQuotes} />
    </div>
  )
}
