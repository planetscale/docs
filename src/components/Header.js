import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import SearchBar from './Searchbar'
import Cookies from 'js-cookie'
import { ButtonSecondary } from './Buttons'
import Logo from './Logo'

const ConditionalLogoWrapper = styled.div`
  display: none;

  ${media.tablet`
    display: unset;
  `}
`

const HeaderWrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: var(--bg-primary-translucent);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      var(--border-primary),
      var(--bg-primary)
    );
  }

  ${media.phone`
    padding: 2em;
    position: relative;
    height: unset;
  `};
`

const HeaderConstrain = styled.div`
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 27px 0;

  ${media.phone`
    padding: unset;
    align-items: center;
  `}
`

const SearchBarWrapper = styled.div``

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.tablet`
  > ${SearchBarWrapper} {
      margin-left: 1em;
    }
  `}

  ${media.phone`
    flex-direction: column;
    justify-content: space-between;

    > ${SearchBarWrapper} {
      display: none;
    }
  `}
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const LinkContainer = styled.a`
  text-decoration: none;
  color: var(--text-primary);

  &:visited {
    color: var(--text-primary);
  }
`

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
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
        </LeftContainer>
        <RightContainer>
          <LinkContainer href={'https://app.planetscaledb.io'}>
            <ButtonSecondary>
              {isSignedIn ? 'Goto dashboard' : 'Sign in'}
            </ButtonSecondary>
          </LinkContainer>
        </RightContainer>
      </HeaderConstrain>
    </HeaderWrapper>
  )
}
