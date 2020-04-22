import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from '../styles/media'
import { Wrapper } from './Layout.Wrapper'

const OverviewContainer = styled(Wrapper)`
  padding-top: 0;

  ${media.largePhone`
    padding: 0;
  `}
`

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2em;

  ${media.largePhone`
    display: block;
    padding: 0 1em;
  `}
`

const CategoryIcon = styled.i`
  font-size: 32px;
  margin-bottom: 16px;
  color: #4d9999;
`

const CategoryTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
`

const PageLink = styled(Link)`
  background-color: #214746;
  color: white;
  padding: 2em;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #347171;
  }

  ${media.largePhone`
    margin-bottom: 1em;
  `}
`

class Overview extends Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <OverviewContainer>
        <CategoryList>
          {this.props.categories.order.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                category={category.name}
                icon={category.icon}
                description={category.description}
                pages={this.getPagesInCategory(
                  category.pages,
                  this.props.docPages
                )}
              ></CategoryCard>
            )
          })}
        </CategoryList>
      </OverviewContainer>
    )
  }
}

function CategoryCard({ category, icon, description, pages }) {
  return (
    <PageLink to={`/${pages[0].fields.slug}`} activeClassName="active">
      <CategoryIcon className={`fas fa-${icon}`}></CategoryIcon>
      <CategoryTitle>{category}</CategoryTitle>
      <p>{description}</p>
    </PageLink>
  )
}

const query = graphql`
  query {
    categories: docsYaml {
      order {
        id
        icon
        name
        description
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
        <Overview
          categories={data.categories}
          docPages={data.docPages}
        ></Overview>
      )
    }}
  ></StaticQuery>
)
