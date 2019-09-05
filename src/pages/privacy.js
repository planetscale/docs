import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'

export default function PrivacyPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node
  const { title, content, updatedOn } = pageData

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={title} pathname="privacy" />
        <Hero
          title={pageData.title}
          subTitle={`Last updated on ${updatedOn}`}
          wrap="wrap"
        ></Hero>
        <Wrapper>
          <MarkdownContent
            whiteSpace="normal"
            html={content}
            customCSS={`
            strong { font-weight: 500; }
            > p:first-child,
            ul + p,
            h3 + p,
            p + p { margin-bottom: 1em; }
          `}
          />
        </Wrapper>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query privacyQuery {
    allPagesYaml(filter: { id: { eq: "privacy" } }) {
      edges {
        node {
          title
          updatedOn(formatString: "MMMM DD, YYYY")
          content
        }
      }
    }
  }
`
