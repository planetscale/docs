import React from 'react'

export default function HeadingBlock(props) {
  const { title, subtitle, banner } = props
  return (
    <div className="mb-4">
      <h1 className="text-4xl font-semibold mb-1">{title}</h1>
      {subtitle && <p className="text-xl text-secondary">{subtitle}</p>}
      {banner && <img src={banner} />}
    </div>
  )
}
