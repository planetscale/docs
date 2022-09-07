import React, { useState } from 'react'

import ReactPlayer from 'react-player/youtube'

export default function VideoBlock(props) {
  const { src } = props
  const [videoURL] = useState(src)

  if (src.startsWith('https://youtu.be') || src.startsWith('https://www.youtube.com')) {
    return (
      <div className={`aspect-w-16 aspect-h-9 mb-3 overflow-hidden rounded-lg`}>
        <ReactPlayer url={videoURL} width='100%' height='100%' controls={true} light={true} />
      </div>
    )
  }

  return (
    <div className='my-3'>
      <video className='w-full' autoPlay muted loop>
        <source src={videoURL} type='video/mp4' />
      </video>
    </div>
  )
}
