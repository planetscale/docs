import React from 'react'
import styled from 'styled-components'
import { fadeInAndRotateAnimation } from '../styles/animations'

import { SmartImage } from './Common.SmartImage'

const _Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2em;
  textalign: center;
`

export const SectionTitle = styled.h1`
	padding-${(props) => (props.alignment === 'right' ? 'left' : 'right')}: 6em;
	text-shadow: 0 0 30px rgba(0,0,0, 0.25);
	font-size: 4em;
	color: white;
	margin: 0;
`

export const SectionSubTitle = styled.h2`
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  margin: 0;
  max-width: 650px;
  font-size: 2em;
  font-weight: 100;
  color: ${(props) => props.theme.colors.tertiary};
`

export const SectionContent = styled.h3`
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
  font-size: 1em;
  max-width: 500px;
  font-weight: 100;
  color: white;
`

const BottomRightImage = styled.img`
  position: absolute;
  right: -5vw;
  bottom: 5vh;
  width: 40vw;
  min-width: 400px;
  max-width: 600px;
  ${fadeInAndRotateAnimation};
`

export function Section({
  backgroundImage,
  backgroundColor,
  overlay,
  children,
}) {
  return (
    <_Section>
      <SmartImage img={backgroundImage} backgroundColor={backgroundColor} />
      {overlay && <BottomRightImage src={overlay} />}
      {children}
    </_Section>
  )
}
