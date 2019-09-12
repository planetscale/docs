import React from 'react'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import overlay from '../images/hero/background-texture.svg'
import { Footer } from '../components/Layout.Footer'
import { BlogPosts, BlogPostLink } from '../components/Blog.PostLink'

function NewsPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title={pageData.title} pathname="news" />
      <Hero title={pageData.title} wrap="wrap" overlay={overlay}></Hero>
      <Section>
        <BlogPosts>
          {data.allMarkdownRemark.edges.map((edge, index) => {
            const { node } = edge
            const { frontmatter, fields } = node

            return (
              <BlogPostLink
                key={`BlogPostLink${index}`}
                {...fields}
                {...frontmatter}
              />
            )
          })}
        </BlogPosts>
      </Section>
      <Footer />
    </Layout>
  )
}

export default NewsPage

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
            date(formatString: "MMMM DD, YYYY")
            description
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "news" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`
