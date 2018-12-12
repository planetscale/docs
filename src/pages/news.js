import React from 'react'
import Link from 'gatsby-link'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Spacing, XLargeSpacing } from '../components/Layout.Spacing'
import { H1 } from '../components/Typography.Headings'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { Button } from '../components/Common.Button'
import { Footer } from '../components/Layout.Footer'

import { BlogPostLink } from '../components/Blog.PostLink'

import background from '../images/hero/blog-bg.svg'
import overlay from '../images/hero/blog-overlay.svg'

export default function NewsPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  const firstBlogPostEdge = data.allMarkdownRemark.edges[0]
  const { node } = firstBlogPostEdge
  const { frontmatter, html, fields } = node
  return (
    <React.Fragment>
      <TitleAndMetaTags title="Blog" pathname="blog" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#9124D8'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
          <HeroSubTitle>{pageData.subtitle}</HeroSubTitle>
          <HeroContent align={'left'}>
            <Link to={`/news/${fields.slug}`}>
              <Button>
                {pageData.blogButton} {frontmatter.title}
              </Button>
            </Link>
          </HeroContent>
        </Wrapper>
      </Hero>
      <Wrapper>
        <H1>{pageData.moreBlogPostsTitle}</H1>
        <Spacing />
        {data.allMarkdownRemark.edges.map((edge) => {
          const { node } = edge
          const { frontmatter, fields } = node

          return <BlogPostLink {...fields} {...frontmatter} />
        })}
      </Wrapper>
      <XLargeSpacing />
      <Footer
        backgroundImage={background}
        backgroundColor={'#9124D8'}
        overlay={overlay}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query newsQuery {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "news" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            author
            date(formatString: "MMMM d, YYYY")
            description
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { regex: "/pages/news/" } }) {
      edges {
        node {
          title
          subtitle
          content
          moreBlogPostsTitle
          blogButton
        }
      }
    }
  }
`
