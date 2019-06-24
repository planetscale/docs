import React from 'react'
import Layout from '../components/layout'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'
import { DownloadContainer, Download } from '../components/Media.Downloads'

export default function MediaPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title="Media" pathname="media" />
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
          </Wrapper>
        </Hero>
        <Wrapper>
          <DownloadContainer>
            {pageData.downloads.map(Download)}
          </DownloadContainer>
        </Wrapper>
        <Footer
          backgroundImage={background}
          backgroundColor={'#24C8D8'}
          overlay={overlay}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query mediaQuery {
    allPagesYaml(filter: { id: { eq: "media" } }) {
      edges {
        node {
          title
          subtitle
          downloads {
            title
            link
            description
          }
        }
      }
    }
  }
`

MediaPage.propTypes = {
  data: PropTypes.object,
}
