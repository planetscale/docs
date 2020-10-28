import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from '../styles/media'
import logo from '../../static/planetscale_icon_color.svg'
import backgroundNoise from '../../static/background-noise.png'

const HomeLink = styled.a`
  flex-grow: 2;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #e1e1e1;

  ${media.phone`
    padding: 0;
    border: 0;
    justify-content: left;
  `}
`

const LogoContainer = styled.div`
  padding: 1.5em;
  border-right: 1px solid #e1e1e1;
`

const Logo = styled.img`
  height: 24px;

  ${media.phone`
    height: 24px;
  `}
`

const DocsBadge = styled.div`
  margin-left: 1.5rem;
  text-transform: uppercase;
  font-weight: 500;
`

const _SidenavContainer = styled.div`
  height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0em;
  background: #f7f7f7 url(${backgroundNoise}) 0 0 repeat;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
  border-right: 1px solid #e1e1e1;
  min-width: 300px;
  width: 25vw;

  ${media.phone`
    width: 100vw;
    display: flex;
    flex-direction: row;
    border: 0;
    border-bottom: 1px solid #f3ebe6;
    height: unset;
    padding: 0 1.5em 0 0;
    z-index: 2;
    background-color: #fff;
    text-shadow: none;
  `}
`

const MenuLink = styled.div`
  display: none;

  ${media.phone`
    position: fixed;
    bottom: 16px;
    right: calc(16px + 60px + 16px);
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #33475B;
    background-color: rgb(251, 250, 249);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px;
    height: 60px;
    width: 60px;
    border-radius: 99px;
    z-index: 3;
  `}
`

const _Icon = styled.i``

const _SidenavList = styled.div`
  padding: 0 0 2em;

  div:last-child {
    margin-bottom: 0;
  }

  ${media.phone`
    position: fixed;
    background: #333;
    padding: 2em;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    color: white;
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
  white-space: nowrap;
  margin-bottom: 2.5em;
`

const _GroupHeading = styled.div`
  font-weight: 500;
  font-size: 0.816em;
  color: #999;
  padding: 0 2em;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${media.phone`
    padding: 0 1em;
  `}
`

const _GroupLinks = styled.ul`
  list-style: none;
  padding: 0;
`

const _PageLink = styled(Link)`
  font-size: 0.816em;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8em 2em;
  transition: background-color 0.25s ease;

  &:hover {
    background: #e1e1e1;
  }

  &.active {
    font-weight: 700;
    background: #e1e1e1;
  }

  ${media.phone`
    padding: 1em;
    border-radius: 8px;

    &.active {
      background: #666;
    }
  `}
`

class Sidenav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileTOCOpen: false,
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
        <HomeLink href="/">
          <LogoContainer>
            <Logo
              src={logo}
              alt="PlanetScale - world's most scalable database clusters with Vitess"
            />
          </LogoContainer>

          <DocsBadge>PlanetScale Documentation</DocsBadge>
        </HomeLink>
        <MenuLink onClick={this.toggleMobileTOC}>
          <_Icon
            className={`fas ${isMobileTOCOpen ? 'fa-times' : 'fa-bars'}`}
          ></_Icon>
        </MenuLink>

        <_SidenavList>
          <_GroupContainer>
            <_GroupLinks>
              <_PageLink
                onClick={this.toggleMobileTOC}
                to="/"
                activeClassName="active"
              >
                Documentation Overview
              </_PageLink>
            </_GroupLinks>
          </_GroupContainer>

          {this.props.categories.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                category={category.name}
                icon={category.icon}
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

function SidenavGroup({ category, icon, pages, onClick }) {
  return (
    <_GroupContainer>
      <_GroupHeading>
        <_Icon className={`fas fa-${icon}`}></_Icon> {category}
      </_GroupHeading>
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
        icon
      }
    }

    docPages: allMarkdownRemark(
      filter: { frontmatter: { title: { ne: "" } } }
    ) {
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
