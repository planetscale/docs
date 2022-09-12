import React from 'react'

import Link from 'next/link'

function QuickStartCard({ href, imgPath, title, children }) {
  return (
    <Link href={href}>
      <a className='quick-start-card flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
        <div className='inline-block img-wrapper h-[32px]'>
          <img alt={title} src={imgPath} style={{ maxHeight: '32px', border: '0px' }} />
        </div>
        <h3 className='text-lg font-semibold text-primary mb-sm'>{title}</h3>
        {children && <p className='text-secondary'>{children}</p>}
      </a>
    </Link>
  )
}

export default QuickStartCard
