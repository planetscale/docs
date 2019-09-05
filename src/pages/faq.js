import React from 'react'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { QAndAContainer, QAndA } from '../components/Faq.QAndA'
import { Footer } from '../components/Layout.Footer'

export default function FaqPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="faq" />
        <Hero title={pageData.title} wrap="wrap" width="100%"></Hero>
        <Wrapper>
          <QAndAContainer>
            {data.faq.edges.map((edge, index) => {
              const { node } = edge
              const { html, frontmatter } = node
              const { question } = frontmatter

              return (
                <QAndA
                  key={`QAndA${index}`}
                  question={question}
                  answer={html}
                />
              )
            })}
          </QAndAContainer>
        </Wrapper>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query faqQuery {
    faq: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { fields: { collection: { eq: "faq" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            question
            order
          }
        }
      }
    }
    allPagesYaml(filter: { id: { eq: "faq" } }) {
      edges {
        node {
          title
        }
      }
    }
  }
`

FaqPage.propTypes = {
  data: PropTypes.object,
}
