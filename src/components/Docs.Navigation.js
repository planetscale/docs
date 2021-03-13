import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import { switchTheme } from '../site.js'
import logo_light from '../../static/logo-docs_light.svg'
import logo_dark from '../../static/logo-docs_dark.svg'
import icon_sun from '../../static/icons/sun.svg'
import icon_moon from '../../static/icons/moon.svg'

const HomeLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  z-index: 1;
  top: 0px;
  border-bottom: 1px solid var(--accent);
  background-color: var(--background2);
  width: 100%;
  height: 86px;

  ${media.phone`
    background-color: var(--background1);
    padding: 0;
    border: 0;
    justify-content: left;
  `}
`

const HomeLink = styled.a`
  flex-grow: 2;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: stretch;
`

const ToggleSwitch = styled.div`
  border-radius: 99px;
  background-color: var(--accent);
  width: 48px;
  height: 24px;
  margin-right: 1.5em;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 99px;
    width: 20px;
    height: 20px;
    background-color: var(--background2);
    background-image: url(${icon_sun});
    background-repeat: no-repeat;
    background-size: contain;
    top: 2px;
    left: 26px;
    transition: left var(--buttonHoverDelay) ease;
  }

  &:hover {
    box-shadow: inset 0 0 16px var(--accent2);
    cursor: pointer;

    &::before {
      box-shadow: var(--shadow1);
    }
  }

  &.dark {
    &::before {
      background-image: url(${icon_moon});
      left: 2px;
    }
  }

  ${media.phone`
    box-shadow: none;
  `}
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

const _SidenavContainer = styled.div`
  height: 100vh;
  overflow: auto;
  top: 0em;
  position: sticky;
  border-right: 1px solid var(--accent);
  min-width: 300px;
  width: 22vw;
  background-color: var(--background2);

  ${media.phone`
    width: 100vw;
    display: flex;
    flex-direction: row;
    border: 0;
    border-bottom: 1px solid var(--accent);
    height: unset;
    z-index: 2;
    background-color: var(--background1);
    text-shadow: none;
  `}
`

const MenuLink = styled.div`
  display: none;

  ${media.phone`
    position: fixed;
    bottom: 16px;
    right: calc(16px + 60px + 16px);
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #000;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px;
    height: 60px;
    border-radius: 99px;
    z-index: 3;
    padding: 0 1em;
  `}
`

const _SidenavList = styled.div`
  padding: 0 0 2em;

  div:last-child {
    margin-bottom: 0;
  }

  ${media.phone`
    position: fixed;
    background: var(--background1);
    padding: 2em;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    transition: bottom 0.25s ease-in-out, opacity 0.25s ease-in-out 0.125s;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    opacity: 1;
    display: block;

    ${_SidenavContainer}.hide & {
      opacity: 0;
      bottom: -100vh;
      transition: bottom 0.5s ease-in-out, opacity 0.25s ease-in-out;
    }

    div:last-child {
      margin-bottom: calc(60px + 16px + 16px);
    }
  `}
`

const _GroupContainer = styled.div`
  margin-bottom: 2.5em;
`

const _GroupHeading = styled.div`
  font-family: 'Inter';
  font-weight: bold;
  padding: 0 1.7em;
  letter-spacing: 1px;
  color: var(--foreground1);

  ${media.phone`
    padding: 0 1em;
  `}
`

const _GroupLinks = styled.ul`
  list-style: none;
  padding: 0;
`

const _PageLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8em 2em;
  color: var(--foreground2);
  position: relative;
  transition: background 0.25s ease;

  &:hover {
    color: var(--link);
    background: var(--accent);
  }

  &.active {
    color: var(--background1);
    background-color: var(--foreground1);
  }

  ${media.phone`
    padding: 1em;

    &.active {
      border-radius: 2px;
    }
  `}
`

class Sidenav extends Component {
  constructor(props) {
    super(props)

    this.toggleSwitchRef = React.createRef()
    this.state = {
      isMobileTOCOpen: false,
      isDarkThemeSet: false,
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.state.isDarkThemeSet = true
      switchTheme('dark')
    }
  }

  getPagesInCategory(category, docPages) {
    const outputPages = []
    category.pages.map((pageID) => {
      docPages.nodes.map((page) => {
        if (page.fields.slug.includes(pageID)) {
          outputPages.push(page)
        }
      })
    })

    return outputPages
  }

  toggleMobileTOC = (boolean) => {
    this.setState((oldState) => {
      return {
        isMobileTOCOpen:
          typeof boolean === 'boolean' ? boolean : !oldState.isMobileTOCOpen,
      }
    })
  }

  toggleTheme = (boolean) => {
    this.setState((oldState) => {
      const localDocument = typeof document !== 'undefined' && document
      if (!oldState.isDarkThemeSet) {
        switchTheme('dark')
        localDocument.getElementById('logo').src = logo_dark
      } else {
        switchTheme('light')
        localDocument.getElementById('logo').src = logo_light
      }

      return {
        isDarkThemeSet:
          typeof boolean === 'boolean' ? boolean : !oldState.isDarkThemeSet,
      }
    })
  }

  componentDidMount() {
    const localDocument = typeof document !== 'undefined' && document

    if (this.state.isDarkThemeSet) {
      localDocument.getElementById('logo').src = logo_dark
      this.toggleSwitchRef.current.classList.add('dark')
    }
  }

  render() {
    const { isMobileTOCOpen, isDarkThemeSet } = this.state

    return (
      <_SidenavContainer className={`${isMobileTOCOpen ? '' : 'hide'}`}>
        <HomeLinkContainer>
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
          <ToggleSwitch
            ref={this.toggleSwitchRef}
            className={isDarkThemeSet ? 'dark' : ''}
            onClick={this.toggleTheme}
          ></ToggleSwitch>
        </HomeLinkContainer>
        <MenuLink onClick={this.toggleMobileTOC}>
          {isMobileTOCOpen ? 'Close' : 'Menu'}
        </MenuLink>

        <_SidenavList>
          <_GroupContainer>
            <_GroupLinks>
              <li>
                <_PageLink
                  onClick={this.toggleMobileTOC}
                  to="/"
                  activeClassName="active"
                >
                  Documentation Overview
                </_PageLink>
              </li>
            </_GroupLinks>
          </_GroupContainer>

          {this.props.categories.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                category={category.name}
                pages={this.getPagesInCategory(category, this.props.docPages)}
                onClick={this.toggleMobileTOC}
              ></SidenavGroup>
            )
          })}
        </_SidenavList>
      </_SidenavContainer>
    )
  }
}

function SidenavGroup({ category, pages, onClick }) {
  return (
    <_GroupContainer>
      <_GroupHeading>{category}</_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <_PageLink
                onClick={onClick}
                to={`${page.fields.slug}`}
                activeClassName="active"
              >
                {page.frontmatter.title}
              </_PageLink>
            </li>
          )
        })}
      </_GroupLinks>
    </_GroupContainer>
  )
}

const query = graphql`
  query {
    categories: docsYaml {
      order {
        id
        name
        pages
      }
    }

    docPages: allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={(data) => {
      return (
        <Sidenav
          categories={data.categories}
          docPages={data.docPages}
        ></Sidenav>
      )
    }}
  ></StaticQuery>
)
