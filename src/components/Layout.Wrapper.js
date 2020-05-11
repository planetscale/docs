import * as React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

export const Wrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
  z-index: 1;

  ${media.largePhone`
    padding: 2em 1.5em 2em 1.5em;
  `};
`

export const _SectionWrapperContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background || '#F8F6F4'};

  ${media.largePhone`
    align-items: stretch;
  `}
`

export const _SectionWrapperContentBound = styled.section`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  padding: ${(props) => (props.padding === 'true' ? '2em 0' : '0')};
  align-items: flex-start;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
`

export function Section({ children, background, flexDirection, padding }) {
  return (
    <_SectionWrapperContainer background={background}>
      <_SectionWrapperContentBound
        flexDirection={flexDirection}
        padding={padding}
      >
        {children}
      </_SectionWrapperContentBound>
    </_SectionWrapperContainer>
  )
}

const _DocsWrapperContentBound = styled.section`
  max-width: 1170px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  ${media.largePhone`
    display: flex;
    flex-direction: column;
    height: 100vh;
  `}
`

export function DocsSection({ children }) {
  return (
    <_SectionWrapperContainer>
      <_DocsWrapperContentBound>{children}</_DocsWrapperContentBound>
    </_SectionWrapperContainer>
  )
}
