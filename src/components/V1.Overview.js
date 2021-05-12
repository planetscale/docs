import React, { Component } from 'react'
import { styled } from './styles/stitches.config'
import { StaticQuery, graphql, Link } from 'gatsby'
import { PageContainer, ArticleBlock, ContentBlock } from './Layout.Wrapper'
import HeadingBlock from './HeadingBlock'
import Header from './Header'
import Footer from './Footer'

const CategoryList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'auto',
  columnGap: '2em',
  rowGap: '2em',
  margin: '2em 0',

  '@phone': {
    display: 'block',
  },

  '@tablet': {
    display: 'block',
  },
})

const CategoryContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '2em',
})

const CategoryTitle = styled('div', {
  fontWeight: '600',
  fontSize: '1.563em',
})

const CategorySubTitle = styled('p', {
  margin: '1em 0 0',
})

const CategoryCard = styled(Link, {
  backgroundColor: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--border-primary)',
  borderRadius: '6px',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: 'var(--bg-secondary)',
  },

  '@phone': {
    marginBottom: '1em',
  },

  '@tablet': {
    marginBottom: '1em',
  },
})

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
        <ContentBlock>
          <ArticleBlock overview>
            <HeadingBlock title="PlanetScale V1 overview" />
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
        </ContentBlock>
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
    categories: v1Yaml {
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
