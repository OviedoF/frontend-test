import CountryInfo from '@/app/components/CountryInfo';
import React from 'react'

export default async function CountryCode({params}) {
  const { countryCode } = await params;

  return (
    <main>
      <CountryInfo code={countryCode} />
    </main>
  )
}
