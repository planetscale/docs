import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'

import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { Button } from '../components/Common.Button'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function ThanksPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title="Thanks" pathname="thanks" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
          <HeroSubTitle>{pageData.subtitle}</HeroSubTitle>
          <HeroContent>{pageData.content}</HeroContent>
          <Link to={'/'}>
            <Button>{pageData.backButton}</Button>
          </Link>
        </Wrapper>
      </Hero>
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
