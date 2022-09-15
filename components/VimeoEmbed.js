import React from 'react'

import Script from 'next/script'

export default function VimeoEmbed(props) {
  const { alt, src } = props

  return (
    <>
      <Script src='https://player.vimeo.com/api/player.js' />
      <figure className='space-y-3'>
        <iframe
          src={src}
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          className='w-full aspect-video rounded'
          title={alt}
        />
        {alt && <figcaption className='text-sm text-center text-secondary'>{alt}</figcaption>}
      </figure>
    </>
  )
}
