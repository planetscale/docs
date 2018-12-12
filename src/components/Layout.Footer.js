import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { fadeInAndRotateAnimation } from '../styles/animations'

import { SmartImage } from './Common.SmartImage'
import { Wrapper } from './Layout.Wrapper'

import { media } from '../styles/media'

import bottomOverlay from '../images/waves-flipped-vertical.png'
import logo from '../../static/img/logo-only.png'

import { footerLinks } from '../site'

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
  max-width: ${(props) => props.theme.sizes.maxWidth};

  display: flex;
  justify-content: start;
  align-items: center;
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

  ${media.largePhone`
    flex-direction: column;
    padding-top: 2.5em;
  `};

  li {
    display: inline-block;
    text-align: center;
    margin-right: 23px;

    ${media.largePhone`
      margin: 0;
      line-height: 3;
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

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 1.5;

  ${media.largePhone`
    flex-direction: column;
  `};
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 2;

  ${media.largePhone`
    margin-top: 2em;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  `};
`

const SocialLinks = styled.div`
  ${media.largePhone`
    font-size: 1.5em;
    line-height: 3em;
  `};
`

const Social = styled.a`
  color: white;
  opacity: 0.5;
  transition: all 0.2s;

  &:nth-child(n + 2) {
    margin-left: 5px;
  }

  &:hover {
    opacity: 1;
  }
`

const Copyright = styled.span`
  color: white;

  ${media.largePhone`
    font-size: 0.5em;
  `};
`
const Logo = styled.img`
  max-width: 200px;
  margin-right: 42px;

  ${media.largePhone`
    margin: 0;
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
          <LeftContainer>
            <PagesList>
              {footerLinks.map(({ name, to }) => {
                return (
                  <li key={to}>
                    <Link to={`${to}`} exact activeStyle={{ opacity: 1 }}>
                      {name}
                    </Link>
                  </li>
                )
              })}
              <li>
                <a
                  href={'https://support.planetscale.com'}
                  activeStyle={{ opacity: 1 }}
                  target="_blank"
                >
                  Support
                </a>
              </li>
            </PagesList>
            <SocialLinks>
              <Social
                href="https://twitter.com/planetscaledata"
                target="_blank"
              >
                <i className="fab fa-twitter-square" />
              </Social>
              <Social
                href="https://www.facebook.com/planetscaledata/"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Social>
              <Social
                href="https://www.linkedin.com/company/planetscale"
                target="_blank"
              >
                <i className="fab fa-linkedin-square" />
              </Social>
            </SocialLinks>
          </LeftContainer>
          <RightContainer>
            <Copyright>©2018 PlanetScale, Inc</Copyright>
          </RightContainer>
        </FooterContent>
      </Wrapper>
      <BottomOverlay src={bottomOverlay} />
    </_Footer>
  )
}
