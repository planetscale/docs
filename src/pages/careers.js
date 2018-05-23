import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper, SmallWrapper } from '../components/Layout.Wrapper'
import { Spacing } from '../components/Layout.Spacing'
import { H1 } from '../components/Typography.Headings'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { Button } from '../components/Common.Button'
import MarkdownContent from '../components/Common.MarkdownContent'
import { Footer } from '../components/Layout.Footer'

import { CareerPosts } from '../containers/Careers.Posts'
import { CareersPostContainer, CareersPost } from '../components/Careers.Post'

import background from '../images/hero/careers-bg.svg'
import overlay from '../images/hero/careers-overlay.svg'

const Content = styled.div`
  margin-top: 0.5em;
  font-weight: 100;
  font-size: 1.15em;
  line-height: 1.75em;
`

export default function CareersPage({ data }) {
  const { allPagesYaml, allGreenhouseJob } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <React.Fragment>
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
            <Link to={`#positions`}>
              <Button>See our Available Positions</Button>
            </Link>
          </HeroContent>
        </Wrapper>
      </Hero>
      <Wrapper id={'positions'}>
        <H1>Open Positions</H1>
        <CareerPosts posts={data.allGreenhouseJob.edges} />
      </Wrapper>
      <SmallWrapper>
        <H1>About Us</H1>
        <Content style={{ textAlign: 'center' }}>
          <MarkdownContent html={pageData.aboutUs} />
        </Content>
      </SmallWrapper>
      <SmallWrapper>
        <H1>{pageData.perks.title}</H1>
        <Content>
          <ul>{pageData.perks.list.map((p) => <li>{p.perk}</li>)}</ul>
        </Content>
      </SmallWrapper>
      <Spacing />
      <Footer
        backgroundImage={background}
        backgroundColor={'#25B7DB'}
        overlay={overlay}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query careersQuery {
    allGreenhouseJob {
      edges {
        node {
          id
          location {
            name
          }
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
    allPagesYaml(filter: { id: { regex: "/pages/careers/" } }) {
      edges {
        node {
          title
          subtitle
          content

          aboutUs
          perks {
            title
            list {
              perk
            }
          }
        }
      }
    }
  }
`
