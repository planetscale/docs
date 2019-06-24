import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'

import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { Button } from '../components/Common.Button'

import { theme } from '../site'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function NotFoundPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <TitleAndMetaTags title="Page Not Found" pathname="404" />
      {/* TODO: Remove ThemeProvider once https://github.com/gatsbyjs/gatsby/issues/5498 is fixed */}
      <ThemeProvider theme={theme}>
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
            <Link to={`/${pageData.homeButtonUrl}`}>
              <Button>{pageData.homeButton}</Button>
            </Link>
          </Wrapper>
        </Hero>
      </ThemeProvider>
      {/* TODO: Remove ThemeProvider once https://github.com/gatsbyjs/gatsby/issues/5498 is fixed */}
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
