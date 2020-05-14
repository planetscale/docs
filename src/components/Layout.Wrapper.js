import * as React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import DocsNavigation from '../components/Docs.Navigation'

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

export const _SectionWrapperContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background || '#F8F6F4'};
  width: 100vw;

  ${media.largePhone`
    align-items: stretch;
  `}
`

const _DocsWrapperContentBound = styled.section`
  max-width: 1170px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  ${media.largePhone`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `}
`

const ContentWrapper = styled.div`
  padding: 1em;
  border-left: 1px solid #f3ebe6;
  border-right: 1px solid #f3ebe6;
  width: calc(100vw - 300px);
  max-width: calc(1170px - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${media.largePhone`
    width: 100%;
    flex-grow: 2;
  `}
`

export function DocsSection({ children }) {
  return (
    <_SectionWrapperContainer>
      <_DocsWrapperContentBound>
        <DocsNavigation></DocsNavigation>
        <ContentWrapper>{children}</ContentWrapper>
      </_DocsWrapperContentBound>
    </_SectionWrapperContainer>
  )
}
