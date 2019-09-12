import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { CareerPosts } from '../containers/Careers.Posts'

//IE11 <details> polyfill
if (typeof window !== 'undefined') {
  require('details-element-polyfill')
}

export default function CareersPage({ data }) {
  const { allPagesYaml, allGreenhouseJobPost } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title={pageData.title} pathname="careers" />
      <Hero
        title={pageData.title}
        subTitle={pageData.subtitle}
        wrap="wrap"
      ></Hero>
      <Section id={'positions'}>
        <CareerPosts posts={allGreenhouseJobPost.edges} />
      </Section>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query careersQuery {
    allGreenhouseJobPost {
      edges {
        node {
          id
          title
          content
        }
      }
    }
    allMarkdownRemark(filter: { fields: { collection: { eq: "careers" } } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "careers" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`
