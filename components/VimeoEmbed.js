import React from 'react'

export default function VimeoEmbed(props) {
  const { alt, src } = props

  const wrapperStyle = {
    width: '100%',
    position: 'relative',
    height: 0,
    paddingBottom: '56.25%',
    borderRadius: '5px',
    marginBottom: '15px'
  }

  const iframeStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '5px'
  }

  return (
    <div className='mt-3'>
      <div style={wrapperStyle}>
        <iframe
          src={src}
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          style={iframeStyle}
          title={alt}
        ></iframe>
      </div>

      {alt && <span className='block mt-1 mb-4 text-sm text-center text-secondary'>{alt}</span>}
    </div>
  )
}
