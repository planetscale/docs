import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import DocsNavigation from './Navigation'
import Header from './Header'
import Footer from './Footer'
import './layout.css'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--bg-primary);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`

export const ContentPanel = styled.div`
  flex-grow: 2;
  width: 100vw;
  display: flex;
  flex-direction: row;

  ${media.phone`
    padding: 0;
  `}
`

export const ContentContainer = styled.div`
  flex-grow: 2;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  ${media.tablet`
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin: 0;
  `}
`

export default ({ children }) => (
  <PageContainer>
    <Header></Header>
    <ContentPanel>
      <ContentContainer>
        <DocsNavigation></DocsNavigation>
        {children}
      </ContentContainer>
    </ContentPanel>
    <Footer></Footer>
  </PageContainer>
)
