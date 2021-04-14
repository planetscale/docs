import React from 'react'
import styled from 'styled-components'

const ImageBlockContainer = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  margin: 2em 0;
  padding-bottom: 1em;
`

const ImageBlockImage = styled.img`
  margin: 0;
`

const ImageBlockCaption = styled.figcaption`
  font-size: 12px;
  color: var(--text-secondary);
`

export default function ImageBlock(props) {
  const { alt, src } = props

  return (
    <ImageBlockContainer>
      <ImageBlockImage src={src} alt={alt}></ImageBlockImage>
      <ImageBlockCaption>{alt}</ImageBlockCaption>
    </ImageBlockContainer>
  )
}
