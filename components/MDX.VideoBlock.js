import React, { useState } from 'react'

export default function VideoBlock(props) {
  const { src } = props
  const [videoURL] = useState(src)

  return (
    <div className='my-3'>
      <video className='w-full' autoPlay muted loop>
        <source src={videoURL} type='video/mp4' />
      </video>
    </div>
  )
}
