import React from 'react'

import MarkdownContent from '../components/Common.MarkdownContent'

export default ({ data, language }) => {
  const post = data.markdownRemark
  return (
    <div>
      <img src={post.image} />
      <div>{post.frontmatter.title}</div>
      <div>{post.frontmatter.date} </div>
      <MarkdownContent html={post.html} />
    </div>
  )
}

export const query = graphql`
  query TeamQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
