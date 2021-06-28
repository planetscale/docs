import React, { useEffect, useState, useContext } from 'react'
import { styled } from '../stitches.config'
import { ThemeContext } from './themeContext'

const ImageBlockContainer = styled('figure', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid $borderPrimary',
  borderRadius: '6px',
  margin: '2em 0',
  padding: '1em',
  backgroundColor: '$bgPrimary',
  width: '100%',
  transition: 'width 242ms ease-in',
  cursor: 'zoom-in',

  '&.zoom': {
    width: '900px',
    transform: 'translate3d(0,0,0)',
    cursor: 'zoom-out',
  },

  '@tinyDesktop': {
    pointerEvents: 'none',
  },
})

const ImageBlockImage = styled('img', {
  margin: 0,
  maxWidth: '100%',
  borderRadius: '6px',
})

const ImageBlockCaption = styled('figcaption', {
  marginTop: '1em',
  fontSize: '12px',
  color: '$textSecondary',
})

export default function ImageBlock(props) {
  const { alt, src } = props
  const [imageURL, setImageURL] = useState(src)
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    const activeThemeSuffix = themeContext.getActiveMode().name
    if (src.split('_light').length > 1) {
      setImageURL(src.split('_light').join(`_${activeThemeSuffix}`))
    }
  }, [themeContext])

  useEffect(() => {
    const config = {
      rootMargin: '-90px 0px 0px 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove('zoom')
        }
      })
    }, config)

    document.querySelectorAll('figure').forEach((figure) => {
      observer.observe(figure)
    })
  })

  const onClickHandler = (e) => {
    e.currentTarget.classList.toggle('zoom')
  }

  return (
    <ImageBlockContainer onClick={onClickHandler}>
      <ImageBlockImage src={imageURL} alt={alt}></ImageBlockImage>
      <ImageBlockCaption>{alt}</ImageBlockCaption>
    </ImageBlockContainer>
  )
}
