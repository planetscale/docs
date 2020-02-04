import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

const _SidenavContainer = styled.div`
  border-right: 1px solid #eee;
  padding: 0 2rem 1rem 0rem;
  margin-right: 2rem;
`
const _GroupContainer = styled.div`
  white-space: nowrap;
`
const _GroupHeading = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #666;
`
const _GroupLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;

  li {
    margin-bottom: 8px;
  }
`
const _PageLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export function DocsSidenav() {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { categories, docPages } = data
        return (
          <_SidenavContainer>
            {categories.order.map((category, index) => {
              return (
                <SidenavGroup
                  key={index}
                  category={category.name}
                  pages={getPagesInCategory(category.pages, docPages)}
                ></SidenavGroup>
              )
            })}
          </_SidenavContainer>
        )
      }}
    ></StaticQuery>
  )
}

function SidenavGroup({ category, pages }) {
  return (
    <_GroupContainer>
      <_GroupHeading>{category}</_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <_PageLink to={`/${page.fields.slug}`}>
                {page.frontmatter.title}
              </_PageLink>
            </li>
          )
        })}
      </_GroupLinks>
    </_GroupContainer>
  )
}

function getPagesInCategory(categoryPages, docPages) {
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
