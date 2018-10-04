import React from 'react'
import Link from 'gatsby-link'
import Script from 'react-load-script'
import styled from 'styled-components'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Spacing } from '../components/Layout.Spacing'
import { H1 } from '../components/Typography.Headings'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { Footer } from '../components/Layout.Footer'
import { Offering, OfferingsContainer } from '../components/Home.Offerings'
import { VitessSection } from '../components/Home.VitessSection'
import { ContactSalesCard } from '../components/Home.ContactSalesCard'

import { media } from '../styles/media'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'
import logo from '../../static/img/logo.png'
import { Button } from '../components/Common.Button'

const Logo = styled.img`
  max-height: 100px;
  margin-left: -70px;

  ${media.largePhone`
    max-height: 50px;
    margin-left: -15px;
  `};
`

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
      <TitleAndMetaTags title="Home" />
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

      <VitessSection
        title={pageData.vitess.title}
        logo={pageData.vitess.logo}
        content={pageData.vitess.content}
        overlay={overlay}
      />

      <Wrapper>
        <OfferingsContainer>
          <H1>{pageData.offerings.title}</H1>
          {pageData.offerings.list.map(Offering)}
        </OfferingsContainer>
      </Wrapper>

      <ContactSalesCard />
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
          vitess {
            title
            logo
            content
          }
          offerings {
            title
            list {
              icon
              title
              content
            }
          }
        }
      }
    }
  }
`
