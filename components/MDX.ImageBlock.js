import React, { useState } from 'react'

export default function ImageBlock(props) {
  const { alt, src } = props
  const [imageURL, setImageURL] = useState(src)

  return (
    <span className='block mt-3 lg:mx-12'>
      <img src={imageURL} alt={alt} className='max-h-[600px] mx-auto'></img>
      {alt && <span className='block text-center text-secondary text-sm mt-1 mb-4'>{alt}</span>}
    </span>
  )
}
