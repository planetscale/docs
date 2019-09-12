import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'
import { Spacing } from '../components/Layout.Spacing'

import { BlogPostShareButtons } from '../components/Blog.Post.ShareButtons'

export default function BlogPage({ data }) {
  const { post } = data
  const { frontmatter, html, fields } = post

  return (
    <Layout>
      <>
        <TitleAndMetaTags
          title={frontmatter.title}
          pathname={`news/${fields.slug}`}
        />
        <Hero
          title={frontmatter.title}
          subTitle={`${frontmatter.date} · ${frontmatter.author}`}
          wrap="wrap"
          width="100%"
        ></Hero>
        <Section>
          <Spacing />
          <MarkdownContent html={html} />
          {frontmatter.share && (
            <BlogPostShareButtons
              shareUrl={`https://planetscale.com/news/${fields.slug}`}
              title={frontmatter.title}
            />
          )}
          <Spacing />
        </Section>
        <Footer />
      </>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        comments
        share
      }
    }
  }
`
