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

import { EmailForm } from '../components/Home.EmailForm'
import { Writer } from '../components/Home.Writer'
import { Offering, OfferingsContainer } from '../components/Home.Offerings'
import { WhyUs, WhyUsContainer } from '../components/Home.WhyUs'

import { media } from '../styles/media'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'
import logo from '../../static/img/logo.png'

const Logo = styled.img`
  max-height: 100px;
  margin-left: -70px;

  ${media.largePhone`
    max-height: 50px;
    margin-left: -15px;
  `};
`

const Breaker = styled.div`
  display: block;

  ${media.largePhone`
    display: none;  
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
          <HeroTitle>
            {pageData.subtitle} for{' '}
            <span style={{ fontWeight: 700 }}>
	    	  <Writer
			texts={pageData.writer}
		   ></Writer></span>
          </HeroTitle>
          <HeroSubTitle>{pageData.content}</HeroSubTitle>
          <EmailForm />
        </Wrapper>
      </Hero>

      <Wrapper>
        <OfferingsContainer>
          <H1>{pageData.offerings.title}</H1>
          {pageData.offerings.list.map(Offering)}
        </OfferingsContainer>

        <Spacing />

        <H1>{pageData.whyUs.title}</H1>
        <WhyUsContainer>{pageData.whyUs.list.map(WhyUs)}</WhyUsContainer>
      </Wrapper>
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
          writer {
            word
          }
          offerings {
            title
            list {
              icon
              title
              content
            }
          }
          whyUs {
            title
            list {
              title
              content
            }
          }
        }
      }
    }
  }
`
