import React from 'react'
import Layout from '../components/layout'
import Script from 'react-load-script'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { ProductAnnouncement } from '../components/Home.ProductAnnouncement'
import { Products } from '../components/Section.Products'
import { EventBanner } from '../components/Event.Banner'
import { SectionHereToHelp } from '../components/Section.HereToHelp'
import { SectionMakeItEasy } from '../components/Section.MakeItEasy'
import { Spacing } from '../components/Layout.Spacing'
import { BlockQuote } from '../components/Block.Quote'
import { SectionProvenTechnology } from '../components/Section.ProvenTechnology'

function handleScriptLoad() {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/'
        })
      }
    })
  }
  window.netlifyIdentity.init()
}

export default function IndexPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <Script
        url="https://identity.netlify.com/v1/netlify-identity-widget.js"
        onLoad={() => handleScriptLoad()}
      />
      <TitleAndMetaTags
        title={pageData.title}
        description={pageData.subtitle}
      />
      {/* <EventBanner isVisible={pageData.eventBannerIsVisible}></EventBanner> */}
      <Hero title={pageData.title} subTitle={pageData.subtitle} wrap="wrap">
        <ProductAnnouncement></ProductAnnouncement>
      </Hero>
      <Spacing />
      <SectionProvenTechnology></SectionProvenTechnology>
      <BlockQuote></BlockQuote>
      <SectionHereToHelp></SectionHereToHelp>
      <Spacing />
      <Spacing />
      <SectionMakeItEasy></SectionMakeItEasy>
      <Spacing />
      <Products></Products>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query homeQuery {
    allPagesYaml(filter: { id: { eq: "index" } }) {
      edges {
        node {
          eventBannerIsVisible
          title
          subtitle
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}
