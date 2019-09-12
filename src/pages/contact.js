import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { media } from '../styles/media'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { Form } from '../components/HubSpot.Form'

const FormCard = styled.div`
  background-color: transparent;
  border: 1px solid #eee;
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

export default function ContactPage({ data, hbspotID }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <Layout>
      <div>
        <TitleAndMetaTags title={pageData.title} pathname="contact" />
        <Hero
          title={pageData.title}
          subTitle={pageData.subtitle}
          wrap="wrap"
        ></Hero>
        <Section background={'transparent'}>
          <FormCard>
            <Form
              portalId="5983949"
              formId="50aac238-e887-4a8a-bf43-a4572e870fe6"
            ></Form>
          </FormCard>
        </Section>
        <Footer />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query contactQuery {
    allPagesYaml(filter: { id: { eq: "contact" } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
  }
`

ContactPage.propTypes = {
  data: PropTypes.object,
}

ContactPage.defaultProps = {
  hbspotID: {
    portalId: '5983949',
    formId: 'e3c1fc2a-5bf0-4d0e-b6b7-88b51eb3e670',
  },
}
