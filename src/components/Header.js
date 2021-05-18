import React, { useEffect, useState } from 'react'
import { styled } from './styles/stitches.config'
import SearchBar from './Searchbar'
import Cookies from 'js-cookie'
import { ButtonSecondary } from './Buttons'
import Logo from './Logo'

const ConditionalLogoWrapper = styled('div', {
  display: 'none',

  '@tablet': {
    display: 'unset',
  },
})

const HeaderWrapper = styled('div', {
  width: '100%',
  height: '90px',
  backgroundColor: 'var(--bg-primary-translucent)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'sticky',
  top: '0',
  zIndex: '3',
  padding: '0',

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

  '@phone': {
    padding: '2em',
    position: 'relative',
    height: 'unset',
    borderBottom: '1px solid var(--border-primary)',

    '&:after': {
      content: 'unset',
    },
  },
})

const HeaderConstrain = styled('div', {
  width: '100%',
  maxWidth: '80rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '27px 0',

  '@phone': {
    padding: 'unset',
    alignItems: 'center',
  },
})

const SearchBarWrapper = styled('div', {})

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '@tablet': {
    [`> ${SearchBarWrapper}`]: {
      marginLeft: '1em',
    },
  },

  '@phone': {
    flexDirection: 'column',
    justifyContent: 'space-between',

    [`> ${SearchBarWrapper}`]: {
      display: 'none',
    },
  },
})

const RightContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

const LinkContainer = styled('a', {
  textDecoration: 'none',
  color: 'var(--text-primary)',

  '&:visited': {
    color: 'var(--text-primary)',
  },
})

export default function Header() {
  const [isSignedIn, setSignedInState] = useState(false)

  useEffect(() => {
    if (typeof Cookies.get('signed_in') !== 'undefined') {
      setSignedInState(true)
    }
  })

  return (
    <HeaderWrapper>
      <HeaderConstrain>
        <LeftContainer>
          <ConditionalLogoWrapper>
            <Logo />
          </ConditionalLogoWrapper>
          {/* <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper> */}
        </LeftContainer>
        <RightContainer>
          <LinkContainer href={'https://app.planetscale.com'}>
            <ButtonSecondary>
              {isSignedIn ? 'Go to dashboard' : 'Sign in'}
            </ButtonSecondary>
          </LinkContainer>
        </RightContainer>
      </HeaderConstrain>
    </HeaderWrapper>
  )
}
