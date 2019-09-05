import React from 'react'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'

export default function DbaasPage({ data }) {
  const { post } = data
  const { frontmatter, html, fields } = post

  return (
    <Layout>
      <>
        <TitleAndMetaTags
          title={frontmatter.title}
          pathname={`dbaas/${fields.slug}`}
        />
        <Hero
          title={frontmatter.title}
          subTitle={
            frontmatter.updatedOn && `Last updated on ${frontmatter.updatedOn}`
          }
          wrap="wrap"
        ></Hero>

        <Wrapper>
          <MarkdownContent html={html} />
        </Wrapper>
        <Footer />
      </>
    </Layout>
  )
}

export const query = graphql`
  query DbaasQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        updatedOn(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
