import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from '../styles/media'
import { Wrapper } from './Layout.Wrapper'

const OverviewContainer = styled(Wrapper)`
  padding: 2em;
  background-color: #fff;
  border-radius: 8px;

  ${media.largePhone`
    padding: 0;
    height: auto;
    background-color: unset;
  `}
`

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2em;
  margin: 2em 0;

  ${media.largePhone`
    display: block;
    margin: 0;
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

const CategoryCard = styled(Link)`
  background-color: #f3ebe6;
  color: #4f7273;
  padding: 2em;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, border 0.2s;
  border: 1px solid #f3ebe6;
  border-radius: 8px;

  &:hover {
    box-shadow: 0px 4px 16px rgba(138, 177, 177, 0.2);
    border: 1px solid #8f847e;
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
        if (page.fields.slug.includes(pageID)) {
          outputPages.push(page)
        }
      })
    })

    return outputPages
  }

  render() {
    return (
      <OverviewContainer>
        <h1>Documentation Overview</h1>
        <CategoryList>
          {this.props.categories.order.map((category, index) => {
            return (
              <Category
                key={index}
                category={category.name}
                icon={category.icon}
                description={category.description}
                pages={this.getPagesInCategory(
                  category.pages,
                  this.props.docPages
                )}
              ></Category>
            )
          })}
        </CategoryList>
      </OverviewContainer>
    )
  }
}

function Category({ category, icon, description, pages }) {
  return (
    <CategoryCard to={`/${pages[0].fields.slug}`} activeClassName="active">
      <CategoryIcon className={`fas fa-${icon}`}></CategoryIcon>
      <CategoryTitle>{category}</CategoryTitle>
      <p>{description}</p>
    </CategoryCard>
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
