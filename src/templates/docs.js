import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import MDXContent from '../components/Common.MDXContent'
import QuickNav from '../components/QuickNav'

export default function DocsPage({ data }) {
  const { doc } = data

  if (doc) {
    const { frontmatter, body, fields, headings } = doc
    return (
      <Fragment>
        <TitleAndMetaTags
          title={frontmatter.title}
          description={frontmatter.title}
          pathname={`${fields.slug}`}
        />
        <MDXContent
          title={frontmatter.title}
          body={body}
          lastUpdatedOn={fields.lastUpdatedOn}
          slug={fields.slug}
        ></MDXContent>
        <QuickNav subNavPages={headings}></QuickNav>
      </Fragment>
    )
  }
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: mdx(
      fields: { slug: { eq: $slug } }
      frontmatter: { title: { ne: "" } }
    ) {
      fields {
        lastUpdatedOn
        slug
      }
      frontmatter {
        title
      }
      headings(depth: h2) {
        value
      }
      body
    }
  }
`
