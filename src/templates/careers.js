import React from 'react'

import MarkdownContent from '../components/Common.MarkdownContent'

export default ({ data, language }) => {
  const post = data.markdownRemark
  return (
    <div>
      <div>{post.frontmatter.name}</div>
      <div>{post.frontmatter.info} </div>
      <a href={post.frontmatter.linkedin}>linkedin</a>
      <MarkdownContent html={post.html} />
    </div>
  )
}

export const query = graphql`
  query CareersQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
