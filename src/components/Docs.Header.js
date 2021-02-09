import React, { useEffect } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 86px;
  border-bottom: 1px solid var(--accent);
  background-color: var(--background1);
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
  font-family: 'Overpass';
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
    <HeaderContainer>
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
    </HeaderContainer>
  )
}
