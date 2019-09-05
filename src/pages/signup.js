import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { media } from '../styles/media'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Form } from '../components/HubSpot.Form'
import { Footer } from '../components/Layout.Footer'

const FormCard = styled.div`
  background-color: #333;
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

export default function SignupPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="signup" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
        <Wrapper>
          <FormCard>
            <Form
              portalId="5983949"
              formId="e3c1fc2a-5bf0-4d0e-b6b7-88b51eb3e670"
            ></Form>
          </FormCard>
        </Wrapper>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query signupQuery {
    allPagesYaml(filter: { id: { eq: "signup" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`

SignupPage.propTypes = {
  data: PropTypes.object,
}
