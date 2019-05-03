import React from 'react'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero, HeroTitle, HeroContent } from '../components/Common.Hero'
import MarkdownContent from '../components/Common.MarkdownContent'

import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/team-bg.svg'
import overlay from '../images/hero/team-overlay.svg'

export default function PrivacyPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node
  const { title, content, lastUpdatedLabel, lastUpdatedDate } = pageData

  return (
    <div>
      <TitleAndMetaTags title={title} pathname="privacy" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
          <HeroContent>{`${lastUpdatedLabel}: ${lastUpdatedDate}`}</HeroContent>
        </Wrapper>
      </Hero>
      <Wrapper>
        <MarkdownContent
          whiteSpace="normal"
          html={content}
          customCSS={`
            strong { font-weight: 500; }
            > p:first-child,
            ul + p,
            h3 + p,
            p + p { margin-bottom: 1em; }
          `}
        />
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
          lastUpdatedLabel
          lastUpdatedDate
          content
        }
      }
    }
  }
`
