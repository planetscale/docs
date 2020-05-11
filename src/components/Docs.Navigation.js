import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from '../styles/media'
import logo from '../../static/planetscale_logo_green_text.svg'

const HomeLink = styled.a`
  flex-grow: 2;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 1.5em 2em;
  border-bottom: 1px solid #f3ebe6;

  ${media.largePhone`
    padding: 0;
    border: 0;
    justify-content: left;
  `}
`

const Logo = styled.img`
  height: 24px;

  ${media.largePhone`
    height: 24px;
  `}
`

const DocsBadge = styled.div`
  color: #8f847e;
  margin-left: 16px;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 0.666em;
  padding: 0.666em;
  background-color: #f3ebe6;

  ${media.largePhone`
    font-size: 12px;
  `}
`

const _SidenavContainer = styled.div`
  border-right: 1px solid #f3ebe6;
  border-left: 1px solid #f3ebe6;
  height: 100vh;
  overflow: auto;

  ${media.largePhone`
    display: flex;
    flex-direction: row;
    border: 0;
    border-bottom: 1px solid #f3ebe6;
    height: unset;
    padding: 1.5em 1em;
    z-index: 2;
  `}
`

const MenuLink = styled.div`
  display: none;

  ${media.largePhone`
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #6C5E5A;  
  `}
`

const _Icon = styled.i``

const _SidenavList = styled.div`
  padding: 0 0 2em;

  div:last-child {
    margin-bottom: 0;
  }

  ${media.largePhone`
    position: fixed;
    background: #333;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 80vw;
    color: white;
    transition: all 0.5s;
    overflow: scroll;

    ${_SidenavContainer}.hide & {
      left: -100%;
    }
  `}
`

const _GroupContainer = styled.div`
  white-space: nowrap;
  margin-bottom: 2.5em;

  ${media.largePhone`
    white-space: unset;
  `}
`

const _GroupHeading = styled.div`
  font-weight: 500;
  font-size: 0.816em;
  color: #999;
  padding: 0 2em;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${media.largePhone`
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
    background-color: #f3ebe6;
  }

  &.active {
    font-weight: 600;
    color: #db3d22;
    background-color: #f3ebe6;
    border-right: 1px solid #db3d22;
  }

  ${media.largePhone`
    padding: 1em;

    &.active {
      border-left: 1px solid #db3d22;
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

  getHTMLPagesInCategory(category, htmlPages) {
    const outputPages = []
    category.pages.map((pageID) => {
      htmlPages.nodes.map((page) => {
        const pageSlug = page.fields.slug.replace(
          'docs',
          page.sourceInstanceName
        )

        if (pageSlug.includes(pageID)) {
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
          <Logo
            src={logo}
            alt="PlanetScale - world's most scalable database clusters with Vitess"
          />
          <DocsBadge>Docs</DocsBadge>
        </HomeLink>
        <MenuLink onClick={this.toggleMobileTOC}>
          <_Icon
            className={`fas ${isMobileTOCOpen ? 'fa-times' : 'fa-bars'}`}
          ></_Icon>
        </MenuLink>

        <_SidenavList>
          <_GroupContainer>
            <_GroupLinks>
              <_PageLink to="/" activeClassName="active">
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
                htmlPages={this.getHTMLPagesInCategory(
                  category,
                  this.props.htmlPages
                )}
              ></SidenavGroup>
            )
          })}
        </_SidenavList>
      </_SidenavContainer>
    )
  }
}

function SidenavGroup({ category, icon, pages, htmlPages }) {
  return (
    <_GroupContainer>
      <_GroupHeading>
        <_Icon className={`fas fa-${icon}`}></_Icon> {category}
      </_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <_PageLink to={`${page.fields.slug}`} activeClassName="active">
                {page.frontmatter.title}
              </_PageLink>
            </li>
          )
        })}

        {htmlPages.map((page, index) => {
          return (
            <li key={index}>
              <_PageLink to={`${page.fields.slug}`} activeClassName="active">
                {page.fields.title}
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
      filter: { frontmatter: { category: { ne: null } } }
    ) {
      nodes {
        frontmatter {
          title
          category
        }
        fields {
          slug
        }
      }
    }

    htmlPages: allFile(filter: { extension: { eq: "html" } }) {
      nodes {
        fields {
          slug
          title
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
          htmlPages={data.htmlPages}
        ></Sidenav>
      )
    }}
  ></StaticQuery>
)
