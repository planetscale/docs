import React from 'react'

import Script from 'next/script'

export default function VimeoEmbed(props) {
  const { alt, src } = props

  return (
    <div className='mt-3'>
      <Script src='https://player.vimeo.com/api/player.js' />
      <div className='mb-3 w-100 relative h-0 rounded' style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={src}
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          className='absolute top-0 left-0 w-full h-full rounded'
          title={alt}
        ></iframe>
      </div>

      {alt && <span className='block mt-1 mb-4 text-sm text-center text-secondary'>{alt}</span>}
    </div>
  )
}
