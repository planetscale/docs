import React, { useContext, useState, useEffect } from 'react'
import { styled } from './styles/stitches.config'
import { ThemeContext } from './styles/themeContext'

const LogoContainer = styled('div', {
  position: 'relative',
  width: '100%',
  paddingBottom: '2em',
  marginBottom: '2em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

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

const LinkContainer = styled('a', {
  display: 'flex',
  textDecoration: 'none',
  alignItems: 'center',
  justifyContent: 'stretch',
})

const V1Badge = styled('div', {
  backgroundColor: 'var(--bg-tertiary)',
  color: 'var(--text-secondary)',
  marginLeft: '1em',
  padding: '0.25em 0.5em',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '900',
})

const BetaBadge = styled('div', {
  backgroundColor: '#765AE2',
  color: '#fff',
  marginLeft: '1em',
  padding: '0.25em 0.5em',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '900',
})

export default function Logo({ version }) {
  const themeContext = useContext(ThemeContext)
  const [imageURL, setImageURL] = useState(themeContext.getActiveMode().logo)

  useEffect(() => {
    setImageURL(themeContext.getActiveMode().logo)
  }, [themeContext])

  return (
    <LogoContainer>
      <LinkContainer href="/">
        <LogoImage src={imageURL} alt="PlanetScale docs logo" />
      </LinkContainer>
      {version === 'v1' ? (
        <LinkContainer href="/v1">
          <V1Badge>V1</V1Badge>
        </LinkContainer>
      ) : (
        <LinkContainer href="/v1">
          <BetaBadge>Beta</BetaBadge>
        </LinkContainer>
      )}
    </LogoContainer>
  )
}
