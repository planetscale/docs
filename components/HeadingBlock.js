import React from 'react'

export default function HeadingBlock(props) {
  const { title, subtitle, banner } = props
  return (
    <div className='mb-4'>
      <h1 className='mb-1 text-4xl font-semibold'>{title}</h1>
      {subtitle && <p className='text-xl text-secondary'>{subtitle}</p>}
      {banner && <img src={banner} alt={title} />}
    </div>
  )
}
