import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import DocsNavigation from './Navigation'
import './layout.css'

export const SiteContainer = styled.section`
  position: relative;
  background-color: var(--bg-primary);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`

export const WidthConstrain = styled.div`
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
  <SiteContainer>
    <WidthConstrain>
      <DocsNavigation></DocsNavigation>
      {children}
    </WidthConstrain>
  </SiteContainer>
)
