import React from 'react'
import Layout from '../components/layout'
import Script from 'react-load-script'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Button, ButtonLink } from '../components/Common.Button'
import { Hero } from '../components/Common.Hero'
import {
  FeatureBackground,
  FeatureContainer,
  Feature,
} from '../components/Vitess.Features'
import { Footer } from '../components/Layout.Footer'
import { Introduction } from '../components/Vitess.Introduction'
import { Architecture } from '../components/Vitess.Architecture'
import { Products } from '../components/Section.Products'
import { EventBanner } from '../components/Event.Banner'
import styled from 'styled-components'

const _SectionTitle = styled.h2`
  font-size: 3em;
  font-weight: 700;
`

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
      <EventBanner></EventBanner>
      <Hero title={pageData.title} subTitle={pageData.subtitle} wrap="wrap">
        <Button className="big clear-color">
          <ButtonLink href="/signup">Request Demo</ButtonLink>
        </Button>
        <Introduction
          logo={pageData.vitess.logo}
          title={pageData.vitess.title}
          description={pageData.vitess.description}
          buttonLabel={pageData.vitess.buttonLabel}
          buttonLink={pageData.vitess.buttonLink}
        ></Introduction>
      </Hero>

      <FeatureBackground>
        <Wrapper>
          <_SectionTitle>Features</_SectionTitle>
          <FeatureContainer>
            {pageData.vitess.list.map(Feature)}
          </FeatureContainer>
          <Architecture
            title={pageData.vitess.architecture.title}
            image={pageData.vitess.architecture.image}
          ></Architecture>
        </Wrapper>
      </FeatureBackground>
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
          title
          subtitle
          vitess {
            logo
            title
            description
            buttonLabel
            buttonLink
            list {
              icon
              title
              content
            }
            architecture {
              title
              image
            }
          }
          offerings {
            title
            icon
            content
          }
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}
