import React from 'react'
import Link from 'gatsby-link'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'
import { Button } from '../components/Common.Button'

export default function StatusPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Status" pathname="status" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
          <HeroSubTitle>{pageData.subtitle}</HeroSubTitle>
          <HeroContent>{pageData.content}</HeroContent>
          <Link to={`/`}>
            <Button>{pageData.backButton}</Button>
          </Link>
        </Wrapper>
      </Hero>
    </div>
  )
}

export const pageQuery = graphql`
  query statusQuery {
    allPagesYaml(filter: { id: { regex: "/pages/status/" } }) {
      edges {
        node {
          title
          subtitle
          content
          backButton
        }
      }
    }
  }
`
