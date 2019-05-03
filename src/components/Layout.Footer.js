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

import _SocialLinks from '../components/Layout.Footer.SocialLinks'

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
  flex-direction: column;
  z-index: 1338;

  > *:not(:last-child):not(:first-child) {
    padding: 100px 0;
  }

  ${media.largePhone`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10em;
  `};
`

const PageLists = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${media.largePhone`
    flex-direction: column;
    align-items: center;
  `};

  ul {
    padding-left: 0;
  }

  li {
    text-align: left;
    list-style: none;

    ${media.largePhone`
      line-height: 3;
      font-size: 1.25em;
      text-align: center;
    `};
  }

  a {
    text-decoration: none;
    color: white;
    opacity: 0.5;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-block;
    padding: 0;
    font-size: 110%;

    &:hover {
      opacity: 1;
    }

    ${media.largePhone`
      font-size: 90%;
    `};
  }
`

const RowZero = styled.div``

const RowOne = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  position: relative;
  align-items: flex-start;

  &::after,
  &::before {
    content: '';
    position: absolute;
    background-color: rgba(255, 255, 255, 0.2);
    height: 1px;
    width: 100%;
  }
  &::before {
    top: 50px;
  }
  &::after {
    bottom: 50px;
  }

  ${media.largePhone`
    flex-direction: row;
  `};
`

const RowTwo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${media.largePhone`
    align-items: center;
    flex-direction: column;
  `};
`

const Copyright = styled.small`
  color: white;
  font-size: 0.9rem;
`
const Logo = styled.img`
  max-width: 200px;

  ${media.largePhone`
    margin: 0;
  `};
`

const FooterLogoLink = styled(Link)`
  padding: 0.2rem 0;
`

const FooterH4 = styled.h4`
  color: white;
  font-size: 1.5em;
  font-weight: 400;
  opacity: 0.75;
  text-align: left;
  margin: 0;

  ${media.largePhone`
    text-align: center;
  `};
`

const ListSection = styled.div`
  ul {
    margin: 0;
  }
  &:not(:last-child):not(:first-child) {
    padding: 0 100px;

    ${media.tablet`
      padding: 0 50px;
    `};
  }
  ${media.largePhone`
    &:not(:last-child) {
      margin-bottom: 1.75em;
    }
  `};
`

function ListItem(props) {
  return <li>{props.children}</li>
}

function ListLinks(props) {
  const listItems = props.data.map((section) => (
    <ListSection key={section.title}>
      <FooterH4>{section.title}</FooterH4>
      <ul>
        {section.data.map(({ id, name, to, external }) => (
          <ListItem key={id}>
            {external && external === true ? (
              <a href={to}>{name}</a>
            ) : (
              <Link to={to}>{name}</Link>
            )}
          </ListItem>
        ))}
      </ul>
    </ListSection>
  ))

  return listItems
}

export function Footer({ backgroundImage, backgroundColor, children }) {
  const FooterLogo = () => (
    <FooterLogoLink to={`/`} activeStyle={{ opacity: 1 }}>
      <Logo src={logo} />
    </FooterLogoLink>
  )

  return (
    <_Footer>
      <SmartImage
        img={backgroundImage}
        backgroundColor={backgroundColor}
        style={{ zIndex: 1337 }}
      />
      <Wrapper>
        <FooterContent>
          <RowZero>
            <FooterLogo />
          </RowZero>
          <RowOne>
            <PageLists>
              <ListLinks data={footerLinks} />
            </PageLists>
          </RowOne>
          <RowTwo>
            <_SocialLinks />
            <Copyright>©2019 PlanetScale, Inc</Copyright>
          </RowTwo>
        </FooterContent>
      </Wrapper>
      <BottomOverlay src={bottomOverlay} />
    </_Footer>
  )
}
