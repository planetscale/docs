import React from 'react'
import Link from 'gatsby-link'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
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

import { CareerPosts } from '../containers/Careers.Posts'

import background from '../images/hero/careers-bg.svg'
import overlay from '../images/hero/careers-overlay.svg'

//IE11 <details> polyfill
if (typeof window !== 'undefined') {
  require('details-element-polyfill')
}

export default function CareersPage({ data }) {
  const { allPagesYaml, allGreenhouseJobPost } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <>
        <TitleAndMetaTags title="Careers" pathname="careers" />
        <Hero
          backgroundImage={background}
          backgroundColor={'#25B7DB'}
          overlay={overlay}
        >
          <Wrapper>
            <HeroTitle>
              <span>{pageData.title}</span>
            </HeroTitle>
            <HeroSubTitle>{pageData.subtitle}</HeroSubTitle>
            <HeroContent>
              {pageData.content}
              <Link to={'/careers/#positions'}>
                <Button>See our Available Positions</Button>
              </Link>
            </HeroContent>
          </Wrapper>
        </Hero>
        <Wrapper id={'positions'}>
          <H1>Open Positions</H1>
          <CareerPosts posts={allGreenhouseJobPost.edges} />
        </Wrapper>
        <Spacing />
        <Footer
          backgroundImage={background}
          backgroundColor={'#25B7DB'}
          overlay={overlay}
        />
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
  query careersQuery {
    allGreenhouseJobPost {
      edges {
        node {
          id
          title
          content
        }
      }
    }
    allMarkdownRemark(filter: { fields: { collection: { eq: "careers" } } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "careers" } }) {
      edges {
        node {
          title
          subtitle
          content
        }
      }
    }
  }
`
