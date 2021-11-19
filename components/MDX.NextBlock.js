import React from 'react'

import Link from 'next/link'

export default function NextBlock(props) {
  const { steps } = props

  return (
    <div className='bg-secondary px-3 pt-2 rounded border mt-4 mb-4'>
      <h1 className='font-semibold mb-1'>Next steps</h1>
      <ul className='list-disc list-inside'>
        {steps.map((step) => {
          return (
            <li className='py-sm' key={step.link}>
              <Link href={step.link}>
                <a className='font-medium'>{step.text}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
