import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { fadeInAndRotateAnimation } from '../styles/animations'

import { SmartImage } from './Common.SmartImage'
import { Wrapper } from './Layout.Wrapper'

import { media } from '../styles/media'

import bottomOverlay from '../images/waves-flipped-vertical.png'
import logo from '../../static/img/logo.png'

import { pages } from '../site'

const _Footer = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 300px;
  overflow: hidden;
`

const BottomRightImage = styled.img`
  position: absolute;
  right: -5vw;
  bottom: 5vh;
  width: 40vw;
  min-width: 400px;
  max-width: 600px;
  ${fadeInAndRotateAnimation};
`

const BottomOverlay = styled.img`
  position: absolute;
  width: 100%;
  min-width: 700px;
  left: 0;
  height: 150px;
  top: -1px;
  overflow: hidden;
  z-index: 0;
`

const FooterContent = styled.div`
  padding-top: 10em;
  margin: 0 auto;
  width: 100%;
  padding: 3em 0;
  max-width: ${(props) => props.theme.sizes.maxWidth};

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1338;
  padding-top: 10em;

  ${media.largePhone`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10em;
  `};
`

const PagesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  min-width: 250px;

  ${media.largePhone`
    flex-direction: column;
    padding-top: 2.5em;
  `} li {
    display: inline-block;
    text-align: center;

    ${media.largePhone`
      margin-left: 0;
      text-align: center;
      padding-top: 2.5em;
      font-size: 1.25em;
    `};
  }

  a {
    text-decoration: none;
    color: white;
    opacity: 0.5;
    font-weight: 600;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
    }
  }
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;

  ${media.largePhone`
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `};
`

const Copyright = styled.span`
  color: white;
  margin-top: 30px;

  ${media.largePhone`
    font-size: 1.25em;  
    padding-top: 2.5em;
  `};
`
const Logo = styled.img`
  max-width: 200px;
  margin-top: -1em;

  ${media.largePhone`
    padding-top: 2.5em;
    max-width: 175px;
    margin-left: -20px;
  `};
`
export function Footer({ backgroundImage, backgroundColor, children }) {
  return (
    <_Footer>
      <SmartImage
        img={backgroundImage}
        backgroundColor={backgroundColor}
        style={{ zIndex: 1337 }}
      />
      <Wrapper>
        <FooterContent>
          <Link to={`/`} activeStyle={{ opacity: 1 }}>
            <Logo src={logo} />
          </Link>
          <RightContainer>
            <PagesList>
              {pages.map(({ name, to }) => {
                return (
                  <li key={to}>
                    <Link to={`${to}`} exact activeStyle={{ opacity: 1 }}>
                      {name}
                    </Link>
                  </li>
                )
              })}
            </PagesList>
            <Copyright>©2018 PlanetScale, Inc</Copyright>
          </RightContainer>
        </FooterContent>
      </Wrapper>
      <BottomOverlay src={bottomOverlay} />
    </_Footer>
  )
}
