import React, { Component } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { media } from './styles/media'
import { PageContainer, ArticleBlock } from './Layout.Wrapper'
import HeadingBlock from './HeadingBlock'
import { ButtonSecondary } from './Buttons'
import Header from './Header'
import Footer from './Footer'

const CalloutCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2em;
  margin: 0 0 4em;

  ${media.phone`
    grid-template-columns: repeat(1, 1fr);
    margin: 2em 0;
  `}
`

const CalloutCard = styled.div`
  border: 1px solid var(--text-primary);
  border-radius: 6px;
  padding: 2em;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 0 16px -64px var(--black);
`

const CalloutCardHeading = styled.h2`
  font-size: 1.75em;
  margin: 0 0 0.5em;
  padding: 0;
`

const CalloutCardSubheading = styled.p`
  font-size: 1em;
  line-height: 1.5em;
  margin: 0 0 1.5em;
  padding: 0;
`

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2em;
  margin: 2em 0;

  ${media.phone`
    display: block;
  `}

  ${media.tablet`
    display: block;
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

const CategorySubTitle = styled.p`
  margin: 1em 0 0;
`

const CategoryCard = styled(Link)`
  background-color: var(--bg-primary);
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  overflow: hidden;

  &:hover {
    background-color: var(--bg-secondary);
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
      <PageContainer>
        <Header />
        <ArticleBlock>
          <HeadingBlock
            title="PlanetScale overview"
            subtitle="Get upto speed on using PlanetScale to power your applications. Follow our tutorial to quickly learn the basics of creating and managing a database or learn more about the concepts, CLI and other aspects of the world's first cloud database."
          />
          <CalloutCardList>
            <CalloutCard>
              <CalloutCardHeading>Get started</CalloutCardHeading>
              <CalloutCardSubheading>
                Use this quick tutorial to create a new PlanetScale database,
                add a schema and run SQL queries on a sample dataset.
              </CalloutCardSubheading>
              <ButtonSecondary>Quickstart</ButtonSecondary>
            </CalloutCard>
            <CalloutCard>
              <CalloutCardHeading>Deep Dive</CalloutCardHeading>
              <CalloutCardSubheading>
                Learn more about how to effectively use PlanetScale's features
                to make schema changes a breeze.
              </CalloutCardSubheading>
              <ButtonSecondary>Deep dive</ButtonSecondary>
            </CalloutCard>
          </CalloutCardList>
          <CategoryList>
            {this.props.categories.order.map((category, index) => {
              return (
                <Category
                  key={index}
                  category={category.name}
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
        </ArticleBlock>
        <Footer />
      </PageContainer>
    )
  }
}

function Category({ category, description, pages }) {
  return (
    <CategoryCard to={`${pages[0].fields.slug}`} activeClassName="active">
      <CategoryContent>
        <CategoryTitle>{category}</CategoryTitle>
        <CategorySubTitle>{description}</CategorySubTitle>
      </CategoryContent>
    </CategoryCard>
  )
}

const query = graphql`
  query {
    categories: docsYaml {
      order {
        id
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
