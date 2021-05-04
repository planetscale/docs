import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { ThemeContext } from './styles/themeContext'

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 2em;
  margin-bottom: 2em;

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

  ${media.tablet`
    padding: unset;
    margin: unset;
    
    &:after {
      display: none;
    }
  `}
`

const LogoImage = styled.img`
  height: 24px;
  width: 5rem;
`

const HomeLink = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: stretch;
`

export default function Logo() {
  const themeContext = useContext(ThemeContext)
  const [imageURL, setImageURL] = useState(
    themeContext.getActiveMode().codeTheme
  )

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
