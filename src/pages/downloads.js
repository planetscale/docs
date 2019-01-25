import React from 'react'
import { H1 } from '../components/Typography.Headings'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { ReleaseContainer, Release } from '../components/Downloads.Release'
import { Footer } from '../components/Layout.Footer'
import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function DownloadsPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Downloads" pathname="downloads" />
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
          <HeroContent>
            <MarkdownContent
              html={pageData.content}
              style={{ color: '#fff' }}
            />
          </HeroContent>
        </Wrapper>
      </Hero>
      <Wrapper>
        <ReleaseContainer>
          <H1>{pageData.releases.title}</H1>
          {pageData.releases.list.map(Release)}
        </ReleaseContainer>
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
  query downloadsQuery {
    allPagesYaml(filter: { id: { regex: "/pages/downloads/" } }) {
      edges {
        node {
          title
          subtitle
          content
          releases {
            title
            list {
              title
              content
              link
            }
          }
        }
      }
    }
  }
`
