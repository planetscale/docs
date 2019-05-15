import React from 'react'
import styled from 'styled-components'

import { SmartImage } from './Common.SmartImage'

import { fadeInAndRotateAnimation } from '../styles/animations'
import { media } from '../styles/media'

import bottomOverlay from '../images/waves.png'

const _Hero = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 12em;
  width: 100%;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  overflow: hidden;

  ${media.largePhone`
    text-align: center;
    padding-bottom: 10em;
  `};
`

export const HeroTitle = styled.h1`
  padding-top: 3em;
  text-shadow: 0 0 50px rgba(0, 0, 0, 0.175);
  font-size: 3em;
  color: white;
  margin: 0;
  font-weight: 100;
  text-align: ${(props) => props.align || 'left'};

  ${media.largePhone`
		font-size: 2.5em;
    padding-top: 1em;
    padding-left: 0;
    padding-right: 0;
  `};
`

export const HeroSubTitle = styled.h2`
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.175);
  margin: 0;
  padding: 0.5em 0 0;
  font-size: 1.75em;
  line-height: 1.25em;
  font-weight: 300;
  color: ${(props) => props.theme.colors.tertiary};
  text-align: ${(props) => props.align || 'left'};

  ${media.largePhone`
		font-size: 1em;
  `};
`

export const HeroContent = styled.h3`
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.05);
  font-size: 1.25em;
  max-width: ${(props) => (props.align ? 'inherit' : '500px')};
  font-weight: 300;
  color: white;
  text-align: ${(props) => props.align || 'left'};
`

const BottomRightImage = styled.img`
  position: absolute;
  right: 7vw;
  bottom: -25vh;
  width: 40vw;
  min-width: 400px;
  max-width: 600px;
  z-index: 0;
  ${fadeInAndRotateAnimation};
`

const BottomOverlay = styled.img`
  position: absolute;
  width: 100%;
  min-width: 700px;
  left: 0;
  height: 150px;
  bottom: -1px;
  overflow: hidden;
  z-index: 0;
`

export function Hero({
  backgroundImage,
  backgroundColor,
  overlay,
  wrap,
  children,
}) {
  return (
    <_Hero wrap={wrap}>
      <SmartImage
        img={backgroundImage}
        backgroundColor={backgroundColor}
        style={{ zIndex: 1337 }}
      />
      {overlay && <BottomRightImage src={overlay} />}
      {children}
      <BottomOverlay src={bottomOverlay} />
    </_Hero>
  )
}
