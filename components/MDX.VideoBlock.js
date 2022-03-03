import React, { useState } from 'react'

export default function VideoBlock(props) {
  const { src } = props
  const [videoURL] = useState(src)

  return (
    <span className='block mt-3 mb-3'>
      <video className='w-full' autoPlay muted loop>
        <source src={videoURL} type='video/mp4' />
      </video>
    </span>
  )
}
