import React from 'react'
import { styled } from './styles/stitches.config'
import NavigationV1 from './Navigation_v1'
import './layout.css'

export const SiteContainer = styled('section', {
  position: 'relative',
  backgroundColor: 'var(--bg-primary)',
  transition: 'backgroundColor var(--themeSwitchTime) ease',
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})

export const WidthConstrain = styled('div', {
  flexGrow: '2',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'center',

  '@tablet': {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    margin: '0',
  },
})

export default ({ children }) => (
  <SiteContainer>
    <WidthConstrain>
      <NavigationV1></NavigationV1>
      {children}
    </WidthConstrain>
  </SiteContainer>
)
