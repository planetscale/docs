import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import { media } from '../styles/media'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { DocsSidenav } from '../components/Docs.Sidenav'
import MarkdownContent from '../components/Common.MarkdownContent'

const PageContent = styled.div``
const PageHeading = styled.h2``

export default function DocsPage({ data }) {
  const { doc, page } = data
  const { frontmatter, html, fields } = doc

  return (
    <Layout>
      <TitleAndMetaTags
        title={frontmatter.title}
        pathname={`docs/${fields.slug}`}
      />
      <Hero title={page.title}></Hero>
      <Section flexDirection="row" padding="true">
        <DocsSidenav></DocsSidenav>
        <PageContent>
          <PageHeading></PageHeading>
          <MarkdownContent html={html} />
        </PageContent>
      </Section>
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
