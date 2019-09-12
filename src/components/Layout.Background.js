import React from 'react'
import styled from 'styled-components'
import { fadeInAndRotateAnimation } from '../styles/animations'
import { media } from '../styles/media'

const _Background = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -1;
  overflow: hidden;

  ${media.largePhone`
    opacity: 0.4;
  `}
`

const BottomRightImage = styled.img`
  position: absolute;
  right: 0vw;
  top: 0vh;
  width: 100vw;
  ${fadeInAndRotateAnimation};

  ${media.largePhone`
    position: relative;
    width: 100vw;
  `}
`

export function Background({ backgroundImage }) {
  return (
    <_Background>
      {backgroundImage && <BottomRightImage src={backgroundImage} />}
    </_Background>
  )
}
