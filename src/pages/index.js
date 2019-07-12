import React from 'react'
import Layout from '../components/layout'
import Script from 'react-load-script'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { H1 } from '../components/Typography.Headings'
import { PageDescription } from '../components/Common.PageDescription'
import { Hero, HeroTitle, HeroSubTitle } from '../components/Common.Hero'
import { FeatureContainer, Feature } from '../components/Vitess.Features'
import { Footer } from '../components/Layout.Footer'
import { ContactSalesCard } from '../components/Home.ContactSalesCard'
import MarkdownContent from '../components/Common.MarkdownContent'
import ConferenceBanner, {
  ConferenceImageDate,
} from '../components/ConferenceBanner'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

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
      <Hero
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
        overlay={overlay}
        wrap="wrap"
      >
        <ConferenceBanner data={pageData.event}>
          <h2>{pageData.event.banner.text}</h2>
          <h4>{pageData.event.banner.date}</h4>
        </ConferenceBanner>
        <Wrapper>
          <HeroTitle>{pageData.subtitle}</HeroTitle>
          <HeroSubTitle>{pageData.content}</HeroSubTitle>
        </Wrapper>
      </Hero>

      <Wrapper>
        <H1>
          <MarkdownContent html={pageData.vitess.title} />
        </H1>
        <PageDescription>{pageData.vitess.description}</PageDescription>
        <FeatureContainer>{pageData.vitess.list.map(Feature)}</FeatureContainer>
      </Wrapper>

      <ContactSalesCard
        title={pageData.offerings.title}
        icon={pageData.offerings.icon}
        content={pageData.offerings.content}
      />
      <Footer
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
        overlay={overlay}
      />
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
          content
          vitessIntroduction {
            title
            logo
            content
          }
          vitess {
            title
            description
            list {
              icon
              title
              content
            }
          }
          offerings {
            title
            icon
            content
          }
          event {
            banner {
              title
              img
              link
              date
            }
            buttons {
              text
              link
            }
          }
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}
