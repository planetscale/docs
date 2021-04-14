import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from './styles/media'
import { ContentBlock } from './Layout.Wrapper'
import HeadingBlock from './HeadingBlock'

const OverviewBlock = styled(ContentBlock)`
  flex-basis: calc(765px + 300px);

  ${media.phone`
    flex-basis: unset;
  `}
`

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2em;
  margin: 2em 0;

  ${media.phone`
    display: block;
    margin: 0;
  `}

  ${media.tablet`
    display: block;
  `}
`

const CategoryIllustration = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid var(--border-primary);
  background-color: var(--bg-primary);
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.25s linear;

  ${media.phone`
    height: 100px;
  `}
`

const CategoryContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
`

const CategoryTitle = styled.div`
  font-weight: 600;
  font-size: 1.563em;
`

const CategoryCard = styled(Link)`
  background-color: var(--bg-primary);
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, border 0.2s;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  overflow: hidden;

  &:hover {
    background-color: var(--bg-secondary);

    > ${CategoryIllustration} {
      transform: scale(1.025);
    }
  }

  ${media.phone`
    margin-bottom: 1em;
  `}

  ${media.tablet`
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
      <OverviewBlock>
        <HeadingBlock title="Documentation overview" />
        <CategoryList>
          {this.props.categories.order.map((category, index) => {
            return (
              <Category
                key={index}
                category={category.name}
                illustration={category.illustration}
                theme="dark"
                description={category.description}
                pages={this.getPagesInCategory(
                  category.pages,
                  this.props.docPages
                )}
              ></Category>
            )
          })}
        </CategoryList>
      </OverviewBlock>
    )
  }
}

function Category({ category, illustration, description, pages }) {
  return (
    <CategoryCard to={`${pages[0].fields.slug}`} activeClassName="active">
      <CategoryIllustration
        image={`/img/categories/${illustration}.svg`}
      ></CategoryIllustration>
      <CategoryContent>
        <CategoryTitle>{category}</CategoryTitle>
        <p>{description}</p>
      </CategoryContent>
    </CategoryCard>
  )
}

const query = graphql`
  query {
    categories: docsYaml {
      order {
        id
        illustration
        name
        description
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
        <Overview
          categories={data.categories}
          docPages={data.docPages}
        ></Overview>
      )
    }}
  ></StaticQuery>
)
