import React from 'react'
import styled from 'styled-components'
import ThemeSwitcher from './Theme.Switcher'
import logo_light from '../../static/logo-docs_light.svg'
import logo_dark from '../../static/logo-docs_dark.svg'
import { media } from '../styles/media'

const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--accent);
  background-color: var(--background1);
  display: flex;
  justify-content: center;
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

const SearchContainer = styled.div`
  padding: 0 1.5em;
  width: 100%;
  max-width: 600px;
`

const SearchBoxLabel = styled.label``

const SearchBox = styled.input`
  font-family: 'Inter';
  border: 1px solid var(--accent);
  font-size: 1.25em;
  border-radius: 2px;
  outline: 0;
  padding: 0.5em;
  width: 100%;
  background-color: var(--background2);
  color: var(--text);

  &:hover {
    box-shadow: var(--shadow1);
  }

  &:focus {
    border-color: var(--foreground2);
    box-shadow: var(--shadow1);
  }

  &::placeholder {
    color: var(--foreground2);
    font-weight: 100;
  }
`

const LinksContainer = styled.div`
  height: 100%;
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
`

const LogoContainer = styled.div`
  padding: 1.5em;
`

const Logo = styled.img`
  height: 24px;

  ${media.phone`
    height: 24px;
  `}
`

const LinkContent = styled.div`
  background-color: var(--background1);
  text-decoration: none;
  border-left: 1px solid var(--accent);
  height: 100%;
  padding: 0 1.5em;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: background-color var(--buttonHoverDelay) ease;

  &:hover {
    background-color: var(--foreground1);
    color: var(--background1);
  }
`

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderConstrain>
        <HomeLink href="/">
          <LogoContainer>
            <Logo
              id="logo"
              src={logo_light}
              title="PlanetScale - Serverless Database for Developers"
              alt="PlanetScale's logo"
            />
          </LogoContainer>
        </HomeLink>
        <ThemeSwitcher></ThemeSwitcher>
        <SearchContainer>
          <SearchBoxLabel htmlFor={'searchbox'}>
            <SearchBox
              id="searchbox"
              placeholder={'Search documentation'}
            ></SearchBox>
          </SearchBoxLabel>
        </SearchContainer>
        <LinksContainer>
          <LinkContainer href={'https://console.planetscale.com'}>
            <LinkContent>Console ▹</LinkContent>
          </LinkContainer>
        </LinksContainer>
      </HeaderConstrain>
    </HeaderWrapper>
  )
}
