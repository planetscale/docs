import React from 'react'
import styled from 'styled-components'
import { fadeInAnimation } from '../styles/animations'

import { media } from '../styles/media'

export const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.maxWidth};
  padding: 2em 1.5em 2em;

  ${media.desktop`
    padding: 5em 1.5em 2em 1.5em;
  `}

  ${media.largePhone`
    padding: 5em 1.5em 2em 1.5em;
  `}

 ${fadeInAnimation}
`

export const SmallWrapper = Wrapper.extend`
  max-width: ${(props) => props.theme.sizes.maxWidthCentered};
`

export const HeaderWrapper = Wrapper.extend`
  max-width: 100%;
`
