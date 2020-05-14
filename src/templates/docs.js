import * as React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { DocsSection } from '../components/Layout.Wrapper'
import MarkdownContent from '../components/Common.MarkdownContent'

const _IFrame = styled.iframe`
  width: 100%;
  flex-grow: 2;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 0 24px #f3ebe6;
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
        <DocsSection>
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
        <DocsSection>
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
