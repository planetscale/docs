import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

const _SidenavContainer = styled.div`
  border: 1px solid #eee;
  padding: 2rem 2rem 1rem;
  margin-right: 2rem;
`
const _GroupContainer = styled.div`
  white-space: nowrap;
`
const _GroupHeading = styled.div`
  font-weight: 600;
  font-size: 18px;
`
const _GroupLinks = styled.ul`
  list-style: none;
  padding: 0;
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
                  pages={getPagesInCategory(category.id, docPages)}
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
              <_PageLink to={`/docs/${page.fields.slug}`}>
                {page.frontmatter.title}
              </_PageLink>
            </li>
          )
        })}
      </_GroupLinks>
    </_GroupContainer>
  )
}

function getPagesInCategory(categoryNameId, docPages) {
  const outputPages = []
  docPages.nodes.map((page) => {
    if (page.frontmatter.category === categoryNameId) {
      outputPages.push(page)
    }
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
