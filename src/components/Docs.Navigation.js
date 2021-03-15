import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import { switchTheme } from '../site.js'

const _SidenavContainer = styled.div`
  min-width: 300px;
  flex-grow: 2;
  margin-top: 3em;
  margin-right: 6em;

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
  padding: 0;
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
  padding: 0.8em 0;
  color: var(--foreground2);
  position: relative;
  transition: background 0.25s ease;

  &:hover {
    color: var(--link);
  }

  &.active {
    color: var(--foreground1);
    font-weight: 700;
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

  render() {
    const { isMobileTOCOpen } = this.state

    return (
      <_SidenavContainer className={`${isMobileTOCOpen ? '' : 'hide'}`}>
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
