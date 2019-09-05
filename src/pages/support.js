import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { media } from '../styles/media'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { SupportForm } from '../components/Support.Form'
import { Footer } from '../components/Layout.Footer'

const FormCard = styled.div`
  background-color: #eee;
  padding: 2em;
  border-radius: 4px;
  position: relative;
  color: #666;
  max-width: 500px;
  margin-bottom: 20px;

  ${media.largePhone`
    max-width: 100%;
  `};
`

export default function SupportPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title="Support" pathname="support" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
        <Wrapper>
          <FormCard>
            <SupportForm />
          </FormCard>
        </Wrapper>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query supportQuery {
    allPagesYaml(filter: { id: { eq: "support" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`

SupportPage.propTypes = {
  data: PropTypes.object,
}
