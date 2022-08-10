import React from 'react'

import Link from 'next/link'
import SVG from 'react-inlinesvg'

function QuickStartCard({ href, svgPath, title, children }) {
  return (
    <Link href={href}>
      <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
        <div className='inline-block h-[32px]'>
          <SVG src={svgPath} height={32} width={37} className='mb-2 text-black dark:text-white' />
        </div>
        <h3 className='text-lg font-semibold text-primary mb-sm'>{title}</h3>
        <p className='text-secondary'>{children}</p>
      </a>
    </Link>
  )
}

export default QuickStartCard
