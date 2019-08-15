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

import { CardContainer, Card } from '../components/CaseStudies.Card'
import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/team-bg.svg'
import overlay from '../images/hero/team-overlay.svg'

export default function CaseStudiesPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="faq" />
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
          </Wrapper>
        </Hero>
        <Wrapper>
          <CardContainer>
            {data.casestudies.edges.map((edge) => {
              const { node } = edge
              const { name, logo, blurb, resourceLink } = node
              const description = blurb.content[0].content[0].value
              console.log(description)
              return (
                <Card
                  name={name}
                  logo={logo}
                  description={description}
                  resourceLink={resourceLink}
                />
              )
            })}
          </CardContainer>
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
  query caseStudiesQuery {
    casestudies: allContentfulVitessCaseStudies {
      edges {
        node {
          name
          logo {
            title
            file {
              url
            }
          }
          blurb {
            content {
              content {
                value
              }
            }
          }
          resourceLink {
            url
            linkText
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "case_studies" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`

CaseStudiesPage.propTypes = {
  data: PropTypes.object,
}
