'use client'
import { Amplify } from 'aws-amplify'

import amplifyconfig from '@/src/amplifyconfiguration.json'
import QuoteGenerator from '@/components/QuoteGenerator'

Amplify.configure(amplifyconfig)

export default function Home() {
  return (
    <div>
      <QuoteGenerator />
    </div>
  )
}
