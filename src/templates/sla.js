import React from 'react'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'

export default function BlogPage({ data }) {
  const { post } = data
  const { frontmatter, html, fields } = post

  return (
    <Layout>
      <TitleAndMetaTags
        title={frontmatter.title}
        pathname={`sla/${fields.slug}`}
      />
      <Hero
        title={frontmatter.title}
        subTitle={`Last updated on ${frontmatter.date}`}
        wrap="wrap"
      ></Hero>

      <Wrapper>
        <MarkdownContent html={html} />
      </Wrapper>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query SLAQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`

BlogPage.propTypes = {
  data: PropTypes.object,
}
