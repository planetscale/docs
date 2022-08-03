import React from 'react'

export default function Footer() {
  return (
    <div className='mt-4 flex items-center justify-between'>
      <span>
        <a className='mr-1.5 text-secondary hover:text-blue' href='/legal/privacy'>
          Privacy
        </a>
        <a className='text-secondary hover:text-blue' href='/legal/siteterms'>
          Terms
        </a>
      </span>
      <span className='text-secondary'>&copy; 2022 PlanetScale Inc.</span>
    </div>
  )
}
