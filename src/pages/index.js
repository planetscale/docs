import React from 'react'
import Script from 'react-load-script'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { H1 } from '../components/Typography.Headings'
import { PageDescription } from '../components/Common.PageDescription'
import { Hero, HeroTitle, HeroSubTitle } from '../components/Common.Hero'
import { FeatureContainer, Feature } from '../components/Vitess.Features'
import { Footer } from '../components/Layout.Footer'
import { ContactSalesCard } from '../components/Home.ContactSalesCard'
import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

function handleScriptLoad() {
  if (typeof window !== `undefined` && window.netlifyIdentity) {
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

export default function IndexPage({ data, location }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <React.Fragment>
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
      >
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
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query homeQuery {
    allPagesYaml(filter: { id: { regex: "/pages/index/" } }) {
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
        }
      }
    }
  }
`
