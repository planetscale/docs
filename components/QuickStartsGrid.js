import React from 'react'

import QuickStartCard from './QuickStartCard'

function QuickStartsGrid() {
  return (
    <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
      <QuickStartCard href='/tutorials/deploy-to-vercel' title='Vercel' svg-path='/docs/img/internals/vercel-logo.svg'>
        Deploy a Next.js app with a PlanetScale database to Vercel.
      </QuickStartCard>
    </div>
  )
}

export default QuickStartsGrid
