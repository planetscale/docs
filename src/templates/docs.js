import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { DocsSection } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import DocsNavigation from '../components/DocsSidenav'
import MarkdownContent from '../components/Common.MarkdownContent'

export default function DocsPage({ data }) {
  const { doc, page } = data
  const { frontmatter, html, fields } = doc

  return (
    <Layout>
      <TitleAndMetaTags title={frontmatter.title} pathname={`${fields.slug}`} />
      <Hero title={page.title}></Hero>
      <DocsSection flexDirection="row" padding="true">
        <DocsNavigation></DocsNavigation>
        <MarkdownContent html={html} />
      </DocsSection>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        collection
        slug
      }
      frontmatter {
        title
        category
      }
      html
    }
    page: pagesYaml(id: { eq: "docs" }) {
      title
    }
  }
`
