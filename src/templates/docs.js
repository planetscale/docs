import React, { Fragment } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import MarkdownContent from '../components/Common.MarkdownContent'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'

const _IFrame = styled.iframe`
  width: 100%;
  flex-grow: 2;
  border: 0;
`

export default function DocsPage({ data }) {
  const { doc, htmlFile } = data

  if (doc) {
    const { frontmatter, html, fields } = doc
    return (
      <Fragment>
        <TitleAndMetaTags
          title={frontmatter.title}
          pathname={`${fields.slug}`}
        />
        <MarkdownContent html={html} />
      </Fragment>
    )
  } else {
    const { publicURL, fields } = htmlFile
    return (
      <Fragment>
        <TitleAndMetaTags
          title="Operator API Reference"
          pathname={`${fields.slug}`}
        />
        <_IFrame src={publicURL}></_IFrame>
      </Fragment>
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
