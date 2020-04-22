import React from 'react'
import styled from 'styled-components'
import { Wrapper } from './Layout.Wrapper'
import { media } from '../styles/media'

const _Hero = styled(Wrapper)`
  padding: 74px 0;

  ${media.largePhone`
    padding: 35px 24px;
  `}
`

const Title = styled.h1`
  font-size: 61px;
  color: white;
  margin: 0;

  ${media.largePhone`
    font-size: 35px;
  `}
`

export function Hero() {
  return (
    <_Hero>
      <Title>Documentation</Title>
    </_Hero>
  )
}
