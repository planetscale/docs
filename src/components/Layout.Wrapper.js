import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

export const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
  padding: 2em 0em 2em;
  z-index: 1;

  ${media.largePhone`
    padding: 2em 1.5em 2em 1.5em;
  `};
`

export const _SectionWrapperContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background || 'white'};
`

export const _SectionWrapperContentBound = styled.section`
  width: 100%;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
`

export function Section({ children, background }) {
  return (
    <_SectionWrapperContainer background={background}>
      <_SectionWrapperContentBound>{children}</_SectionWrapperContentBound>
    </_SectionWrapperContainer>
  )
}
