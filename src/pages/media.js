import React from 'react'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { DownloadContainer, Download } from '../components/Media.Downloads'

export default function MediaPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="media" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
        <Section>
          <DownloadContainer>
            {pageData.downloads.map(Download)}
          </DownloadContainer>
        </Section>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query mediaQuery {
    allPagesYaml(filter: { id: { eq: "media" } }) {
      edges {
        node {
          title
          subtitle
          downloads {
            title
            link
            description
          }
        }
      }
    }
  }
`

MediaPage.propTypes = {
  data: PropTypes.object,
}
