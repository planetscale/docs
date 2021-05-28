import React, { useLayoutEffect } from 'react'
import { styled } from './styles/stitches.config'
import DocsNavigation from './Navigation'
import './layout.css'
import { getCssString } from './styles/stitches.config'

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

export default function Layout({ children }) {
  useLayoutEffect(() => {
    const style = document.createElement('style')
    style.id = 'stitches'
    style.key = 'stitches'
    style.dangerouslySetInnerHTML = { __html: getCssString() }
    document.head.appendChild(style)
  })

  return (
    <SiteContainer>
      <WidthConstrain>
        <DocsNavigation></DocsNavigation>
        {children}
      </WidthConstrain>
    </SiteContainer>
  )
}
