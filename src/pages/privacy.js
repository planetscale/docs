import React from 'react'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero, HeroTitle } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'

import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/team-bg.svg'
import overlay from '../images/hero/team-overlay.svg'

export default function PrivacyPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Terms of Service" pathname="tos" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
        </Wrapper>
      </Hero>
      <Wrapper>
        <MarkdownContent html={pageData.content} style={{ fontWeight: 400 }} />
      </Wrapper>
      <Footer
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query privacyQuery {
    allPagesYaml(filter: { id: { regex: "/pages/privacy/" } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
