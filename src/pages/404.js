import React from 'react'
import Link from 'gatsby-link'

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
import { Button } from '../components/Common.Button'

import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function NotFoundPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <React.Fragment>
      <TitleAndMetaTags title="Page Not Found" pathname="404" />
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
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query pageNotFoundQuery {
    allPagesYaml(filter: { id: { regex: "/pages/pageNotFound/" } }) {
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
