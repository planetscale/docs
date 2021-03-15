import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import {
  SearchContainer,
  SearchBoxLabel,
  SearchBox,
} from '../components/Searchbar'

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--accent);
  background-color: var(--background1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
`

const HeaderConstrain = styled.div`
  position: sticky;
  top: 0;
  max-width: 80rem;
  width: 100%;
  height: 86px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const LinksContainer = styled.div`
  display: flex;
  align-items: stretch;
`

const LinkContainer = styled.a`
  text-decoration: none;
  color: var(--foreground1);

  &:visited {
    color: var(--foreground1);
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

  ${media.phone`
    height: 24px;
  `};
`

const LinkContent = styled.div`
  text-decoration: none;
  padding: 0.5em 1.5em;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border: 1px solid var(--accent);
  border-radius: 6px;
  font-size: 14px;

  &:hover {
    background-color: var(--foreground1);
    color: var(--background1);
  }
`

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderConstrain>
        <LeftContainer>
          <HomeLink href="/">
            <Logo />
          </HomeLink>
          <SearchContainer>
            <SearchBoxLabel htmlFor={'searchbox'}>
              <SearchBox
                id="searchbox"
                placeholder={'Search documentation'}
              ></SearchBox>
            </SearchBoxLabel>
          </SearchContainer>
        </LeftContainer>
        <LinksContainer>
          <LinkContainer href={'https://console.planetscale.com'}>
            <LinkContent>Console</LinkContent>
          </LinkContainer>
        </LinksContainer>
      </HeaderConstrain>
    </HeaderWrapper>
  )
}
