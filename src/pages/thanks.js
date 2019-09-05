import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Hero } from '../components/Common.Hero'

export default function ThanksPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title="Thanks" pathname="thanks" />
      <Hero
        title={pageData.title}
        subTitle={pageData.subtitle}
        wrap="wrap"
      ></Hero>
    </Layout>
  )
}

export const pageQuery = graphql`
  query thanksQuery {
    allPagesYaml(filter: { id: { eq: "thanks" } }) {
      edges {
        node {
          title
          subtitle
          backButton
        }
      }
    }
  }
`
