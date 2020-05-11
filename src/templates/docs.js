import * as React from 'react'
import { media } from '../styles/media'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { DocsSection } from '../components/Layout.Wrapper'
import DocsNavigation from '../components/Docs.Navigation'
import MarkdownContent from '../components/Common.MarkdownContent'

const _IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  border-right: 1px solid #f3ebe6;

  ${media.largePhone`
    border: 0;
  `}
`

export default function DocsPage({ data }) {
  const { doc, htmlFile } = data

  if (doc) {
    const { frontmatter, html, fields } = doc
    return (
      <Layout>
        <TitleAndMetaTags
          title={frontmatter.title}
          pathname={`${fields.slug}`}
        />
        <DocsSection flexDirection="row" padding="true">
          <DocsNavigation></DocsNavigation>
          <MarkdownContent html={html} />
        </DocsSection>
      </Layout>
    )
  } else {
    const { publicURL, fields } = htmlFile
    return (
      <Layout>
        <TitleAndMetaTags
          // title={frontmatter.title}
          pathname={`${fields.slug}`}
        />
        <DocsSection flexDirection="row" padding="true">
          <DocsNavigation></DocsNavigation>
          <_IFrame src={publicURL}></_IFrame>
        </DocsSection>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { category: { ne: null } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        category
      }
      html
    }

    htmlFile: file(extension: { eq: "html" }, fields: { slug: { eq: $slug } }) {
      publicURL
      fields {
        slug
      }
    }
  }
`
