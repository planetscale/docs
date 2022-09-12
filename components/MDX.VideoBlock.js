import React, { useState } from 'react'

export default function VideoBlock(props) {
  const { alt, src } = props
  const [videoURL] = useState(src)

  return (
    <div className='mt-3'>
      <video className='w-full' autoPlay muted loop>
        <source src={videoURL} type='video/mp4' />
      </video>

      {alt && <span className='block mt-1 mb-4 text-sm text-center text-secondary'>{alt}</span>}
    </div>
  )
}
