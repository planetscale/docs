import React, { useContext, useState, useEffect } from 'react'
import { styled } from './styles/stitches.config'

import { ThemeContext } from './styles/themeContext'

const LogoContainer = styled('div', {
  position: 'relative',
  width: '100%',
  paddingBottom: '2em',
  marginBottom: '2em',

  '&:after': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background:
      'linear-gradient(to right, var(--border-primary), var(--bg-primary))',
  },

  '@tablet': {
    padding: 'unset',
    margin: 'unset',

    '&:after': {
      display: 'none',
    },
  },
})

const LogoImage = styled('img', {
  height: '24px',
  width: '5rem',
})

const HomeLink = styled('a', {
  display: 'flex',
  textDecoration: 'none',
  alignItems: 'center',
  justifyContent: 'stretch',
})

export default function Logo() {
  const themeContext = useContext(ThemeContext)
  const [imageURL, setImageURL] = useState(themeContext.getActiveMode().logo)

  useEffect(() => {
    setImageURL(themeContext.getActiveMode().logo)
  }, [themeContext])

  return (
    <LogoContainer>
      <HomeLink href="/">
        <LogoImage src={imageURL} alt="PlanetScale docs logo" />
      </HomeLink>
    </LogoContainer>
  )
}
