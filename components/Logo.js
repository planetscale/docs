import React, { useContext, useState, useEffect } from 'react'
import { styled } from '../stitches.config'
import { ThemeContext } from './themeContext'
import Link from 'next/link'

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
    background: 'linear-gradient(to right, $borderPrimary, $bgPrimary)',
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
  backgroundColor: '$bgSecondary',
  color: '$textSecondary',
  marginLeft: '1em',
  padding: '0.42em 1em',
  borderRadius: '99px',
  fontSize: '12px',
  fontWeight: '500',
  letterSpacing: '0.05em',
  fontFamily: '$mono',
})

const BetaBadge = styled('div', {
  backgroundImage:
    'linear-gradient(to bottom left, $gradientFrom, $gradientTo)',
  backgroundColor: '$textPurple',
  color: '#fff',
  marginLeft: '1em',
  padding: '0.42em 1em',
  borderRadius: '99px',
  fontSize: '12px',
  fontWeight: '500',
  letterSpacing: '0.05em',
  fontFamily: '$mono',
})

export default function Logo({ version }) {
  const themeContext = useContext(ThemeContext)
  const [imageURL, setImageURL] = useState(themeContext.getActiveMode().logo)

  useEffect(() => {
    setImageURL(themeContext.getActiveMode().logo)
  }, [themeContext])

  return (
    <LogoContainer>
      <Link href="/" passHref>
        <LinkContainer>
          <LogoImage src={imageURL} alt="PlanetScale documentation logo" />
        </LinkContainer>
      </Link>
      {version === 'v1' ? (
        <Link href="/v1" passHref>
          <LinkContainer href="/v1">
            <V1Badge>V1</V1Badge>
          </LinkContainer>
        </Link>
      ) : (
        <Link href="/" passHref>
          <LinkContainer href="/">
            <BetaBadge>Beta</BetaBadge>
          </LinkContainer>
        </Link>
      )}
    </LogoContainer>
  )
}
