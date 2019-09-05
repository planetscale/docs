import React from 'react'
import Layout from '../components/layout'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { CardContainer, Card } from '../components/CaseStudies.Card'
import { Footer } from '../components/Layout.Footer'

export default function CaseStudiesPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="faq" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
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
        <Footer />
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
