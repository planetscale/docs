import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Wrapper } from './Layout.Wrapper'
import { media } from '../styles/media'
import logo from '../../static/img/logo-only.png'
import { footerLinks } from '../site'
import SocialLinks from '../components/Layout.Footer.SocialLinks'

const _Footer = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 300px;
  overflow: hidden;
  background-color: #fafafa;
  margin-top: 5em;
`

const FooterContent = styled.div`
  padding-top: 1em;
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
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
  `};
`

const PageLists = styled.div`
  list-style-type: none;
  width: 100%;
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
      line-height: 2;
      font-size: 1.25em;
      text-align: center;
    `};
  }

  a {
    text-decoration: none;
    color: #db3d22;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-block;
    padding: 0;
    font-size: 110%;

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
    background-color: #eee;
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
  margin-bottom: 1em;

  ${media.largePhone`
    align-items: center;
    flex-direction: column;
  `};
`

const Copyright = styled.small`
  color: #db3d22;
  font-size: 0.9rem;
`
const Logo = styled.img`
  max-width: 50px;

  ${media.largePhone`
    margin: 0;
  `};
`

const FooterLogoLink = styled(Link)`
  padding: 0.2rem 0;
`

const FooterH4 = styled.h4`
  color: #db3d22;
  font-size: 1.3em;
  font-weight: 400;
  opacity: 0.75;
  text-align: left;
  margin: 0;

  ${media.largePhone`
    text-align: center;
    margin-bottom: .25em;
  `};
`

const ListSection = styled.div`
  ul {
    margin: 0;
  }

  li {
    font-size: 0.9em;
  }
  ${media.largePhone`
    &:not(:last-child) {
      margin-bottom: 3em;
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

export function Footer({ children }) {
  const FooterLogo = () => (
    <FooterLogoLink to={'/'} activeStyle={{ opacity: 1 }}>
      <Logo src={logo} />
    </FooterLogoLink>
  )

  return (
    <_Footer>
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
            <SocialLinks />
            <Copyright>©2019 PlanetScale, Inc</Copyright>
          </RowTwo>
        </FooterContent>
      </Wrapper>
    </_Footer>
  )
}
