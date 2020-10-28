import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { IFrameContainer } from '../components/Layout.Wrapper'
import MarkdownContent from '../components/Common.MarkdownContent'

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
        <MarkdownContent html={html} contentStyle={frontmatter.contentStyle} />
      </Fragment>
    )
  }
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { title: { ne: "" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        contentStyle
      }
      html
    }
  }
`
