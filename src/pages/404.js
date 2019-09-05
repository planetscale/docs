import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Hero } from '../components/Common.Hero'
import { theme } from '../site'

export default function NotFoundPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title="Page Not Found" pathname="404" />
      <ThemeProvider theme={theme}>
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
      </ThemeProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query pageNotFoundQuery {
    allPagesYaml(filter: { title: { eq: "Page Not Found" } }) {
      edges {
        node {
          title
          subtitle
          homeButton
          homeButtonUrl
        }
      }
    }
  }
`
