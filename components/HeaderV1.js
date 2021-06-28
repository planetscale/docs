import React from 'react'
import { styled } from '../stitches.config'
import { ButtonSecondary } from './Buttons'
import SearchBar from './Searchbar'
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
  backgroundColor: '$bgPrimary',
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
    background: 'linear-gradient(to right, $borderPrimary, $bgPrimary)',
  },

  '@phone': {
    padding: '2em',
    position: 'relative',
    height: 'unset',
    borderBottom: '1px solid $borderPrimary',

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

const SearchBarWrapper = styled('div', {
  visibility: 'hidden',
})

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
  color: '$textPrimary',

  '&:visited': {
    color: '$textPrimary',
  },
})

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderConstrain>
        <LeftContainer>
          <ConditionalLogoWrapper>
            <Logo />
          </ConditionalLogoWrapper>
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
        </LeftContainer>
        <RightContainer>
          <LinkContainer href={'https://console.planetscale.com'}>
            <ButtonSecondary>Sign In</ButtonSecondary>
          </LinkContainer>
        </RightContainer>
      </HeaderConstrain>
    </HeaderWrapper>
  )
}
