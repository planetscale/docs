import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from '../styles/media'

const _SidenavContainer = styled.div`
  border-right: 1px solid #eee;
  padding: 0 2rem 1rem 0rem;
  margin-right: 2rem;

  ${media.largePhone`
    border: 0;
    padding: 0;
    background-color: #f7f7f7;
    margin: 0 0 2em;
    border-radius: 8px;
  `}
`

const _SidenavTitle = styled.div`
  display: none;

  ${media.largePhone`
    border-bottom: 1px solid #e1e1e1;
    padding: 1em  2em 1em 1em;
    margin-bottom: 1em;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    ${_SidenavContainer}.hide & {
      border-bottom: 0;
      margin-bottom: 0;
    }
  `}
`

const _Label = styled.h3`
  margin: 0;

  ${media.largePhone`
    flex-grow: 2;
  `}
`

const _Icon = styled.i`
  font-size: 24px;
`

const _SidenavList = styled.div`
  ${media.largePhone`
    padding: 0 1em;
    ${_SidenavContainer}.hide & {
      display: none;
    }
  `}
`

const _GroupContainer = styled.div`
  white-space: nowrap;

  ${media.largePhone`
    white-space: unset;
  `}
`

const _GroupHeading = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 1em;
`

const _GroupLinks = styled.ul`
  list-style: none;
  padding: 0px 0 0;
  margin-bottom: 42px;

  li {
    margin-bottom: 8px;
  }
`

const _PageLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3em 0;

  &:hover {
    color: #db3d22;
  }

  &.active {
    font-weight: 600;
    color: #db3d22;
    &:after {
      display: inline-block;
      margin-left: 8px;
      content: '◁';
      font-size: 16px;
    }
  }
`

class Sidenav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileTOCOpen: false,
    }
  }

  getPagesInCategory(categoryPages, docPages) {
    const outputPages = []
    categoryPages.map((pageID) => {
      docPages.nodes.map((page) => {
        if (page.fields.slug === pageID) {
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
        <_SidenavTitle onClick={this.toggleMobileTOC}>
          <_Label>Table of Contents</_Label>
          <_Icon
            className={`fas ${
              isMobileTOCOpen ? 'fa-angle-up' : 'fa-angle-down'
            }`}
          ></_Icon>
        </_SidenavTitle>
        <_SidenavList>
          {this.props.categories.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                category={category.name}
                pages={this.getPagesInCategory(
                  category.pages,
                  this.props.docPages
                )}
              ></SidenavGroup>
            )
          })}
        </_SidenavList>
      </_SidenavContainer>
    )
  }
}

function SidenavGroup({ category, pages }) {
  return (
    <_GroupContainer>
      <_GroupHeading>{category}</_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <_PageLink to={`/${page.fields.slug}`} activeClassName="active">
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

    docPages: allMarkdownRemark(
      filter: { fields: { collection: { eq: "docs" } } }
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
