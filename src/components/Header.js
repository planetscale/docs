import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import SearchBar from './Searchbar'
import Cookies from 'js-cookie'
import { ButtonSecondary } from './Buttons'

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--border-primary);
  background-color: var(--bg-primary-translucent);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0 64px;

  ${media.phone`
    padding: 0 24px;
    position: unset;
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
    align-items: center;
  `}
`

const SearchBarWrapper = styled.div``

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;

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

const HomeLink = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: stretch;
  margin-right: 2em;
`

const Logo = styled.div`
  height: 24px;
  width: 5rem;
  background: var(--logo);
  background-size: contain;
  background-repeat: no-repeat;
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
          <HomeLink href="/">
            <Logo />
          </HomeLink>
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
