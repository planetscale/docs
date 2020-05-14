import * as React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import DocsNavigation from '../components/Docs.Navigation'

export const PageContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background || '#F8F6F4'};
  width: 100vw;

  ${media.phone`
    align-items: stretch;
  `}
`

const MaxWidthBoundary = styled.section`
  max-width: 1170px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  ${media.phone`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `}
`

const ContentContainer = styled.div`
  padding: 1em;
  border-left: 1px solid #f3ebe6;
  border-right: 1px solid #f3ebe6;
  width: calc(100vw - 300px);
  max-width: calc(1170px - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${media.phone`
    width: 100%;
    flex-grow: 2;
  `}
`

export function DocsSection({ children }) {
  return (
    <PageContainer>
      <MaxWidthBoundary>
        <DocsNavigation></DocsNavigation>
        <ContentContainer>{children}</ContentContainer>
      </MaxWidthBoundary>
    </PageContainer>
  )
}
