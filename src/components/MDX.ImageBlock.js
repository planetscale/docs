import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { styled as stitchesStyled } from './styles/stitches.config'
import { ThemeContext } from './styles/themeContext'
import * as Dialog from '@radix-ui/react-dialog'

const DialogTrigger = stitchesStyled(Dialog.Trigger, {
  padding: '0',
  background: 'none',
  border: 'unset',

  '@tinyDesktop': {
    pointerEvents: 'none',
  },
})

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
  max-width: 100%;
  border-radius: 6px;
`

const ImageBlockCaption = styled.figcaption`
  font-size: 12px;
  color: var(--text-secondary);
`

const StyledOverlay = stitchesStyled(Dialog.Overlay, {
  backdropFilter: 'blur(8px)',
  opacity: '0.75',
  backgroundColor: 'var(--gray-600)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
})

const StyledContent = stitchesStyled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  padding: 0,
  width: 'calc(765px + 215px)',
  margin: '2em auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  '&:focus': {
    outline: 'none',
  },
})

const DialogFigure = stitchesStyled('figure', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: 0,
  backgroundColor: 'var(--bg-secondary)',
  borderRadius: 6,
  padding: '2em',

  '> img': {
    width: '100%',
  },
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

  return (
    <Dialog.Root>
      <DialogTrigger>
        <ImageBlockContainer>
          <ImageBlockImage src={imageURL} alt={alt}></ImageBlockImage>
          <ImageBlockCaption>{alt}</ImageBlockCaption>
        </ImageBlockContainer>
      </DialogTrigger>
      <StyledOverlay />
      <StyledContent>
        <DialogFigure>
          <img src={imageURL}></img>
          <figcaption>{alt}</figcaption>
        </DialogFigure>
      </StyledContent>
    </Dialog.Root>
  )
}
