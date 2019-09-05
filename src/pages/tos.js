import React from 'react'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'

export default function TOSPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title="Terms of Service" pathname="tos" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
        <Wrapper>
          <MarkdownContent
            html={pageData.content}
            style={{ fontWeight: 400 }}
          />
        </Wrapper>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query tosQuery {
    allPagesYaml(filter: { id: { eq: "tos" } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
