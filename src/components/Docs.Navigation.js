import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import { switchTheme } from '../site.js'
import * as Collapsible from '@radix-ui/react-collapsible'

const _SidenavContainer = styled.div`
  min-width: 300px;
  flex-grow: 2;
  margin-top: 4em;
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
  `}
`

const _GroupContainer = styled(Collapsible.Root)`
  margin-bottom: 1.5em;
`

const _GroupHeading = styled(Collapsible.Button)`
  font-family: 'Inter';
  font-size: 16px;
  letter-spacing: 1px;
  color: var(--foreground1);
  background-color: unset;
  border: unset;
  padding: 0;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:before {
    content: '›';
    display: inline-block;
    margin-right: 8px;
    height: 22px;
  }

  &:active,
  &:focus {
    outline: unset;
    border: unset;
  }

  &[data-state='open'] {
    &:before {
      transform: rotate(90deg);
    }
  }

  ${media.phone`
    padding: 0 1em;
  `}
`

const _GroupLinks = styled(Collapsible.Content)`
  padding: 0;
  margin-bottom: 3em;
`

const _PageLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 1.5em 1em;
  color: var(--foreground2);
  position: relative;
  transition: background 0.25s ease;

  &:before {
    content: ' ';
    height: 14px;
    width: 1px;
    left: -0.8em;
    position: absolute;
  }

  &:hover {
    color: var(--link);

    &:before {
      border-left: 1px solid var(--link);
    }
  }

  &.active {
    color: var(--foreground1);
    font-weight: 700;

    &:before {
      border-left: 1px solid white;
    }
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
          <_PageLink
            onClick={this.toggleMobileTOC}
            to="/"
            activeClassName="active"
          >
            Documentation Overview
          </_PageLink>

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
  const isChildActive = (children) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const isChildActive = pages.reduce((accumulator, page) => {
      console.log(url.includes(page.fields.slug))
      return accumulator || url.includes(page.fields.slug)
    }, false)

    return isChildActive
  }

  return (
    <_GroupContainer defaultOpen={isChildActive}>
      <_GroupHeading>{category}</_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <div key={index}>
              <_PageLink
                onClick={onClick}
                to={`${page.fields.slug}`}
                activeClassName="active"
              >
                {page.frontmatter.title}
              </_PageLink>
            </div>
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
