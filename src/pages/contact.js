import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { media } from '../styles/media'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { Form } from '../components/HubSpot.Form'

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

const ContactCard = styled.div`
  background-color: #eee;
  padding: 2em 2em 1em;
  border-radius: 4px;
  position: relative;
  color: #666;
  max-width: 500px;

  ${media.largePhone`
    max-width: 100%;
  `};
`

const CardHeader = styled.div`
  font-size: 1em;
  font-weight: 500;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 10px;
  margin-bottom: 30px;
`

const ContactPoint = styled.div`
  font-size: 1em;
  font-weight: 400;
  padding-bottom: 10px;
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`

const ContactPointIcon = styled.div`
  margin-right: 10px;
`

const ContactPointText = styled.div`
  font-size: 1em;
  font-weight: 400;
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
        <Wrapper>
          <FormCard>
            <Form
              portalId="5983949"
              formId="50aac238-e887-4a8a-bf43-a4572e870fe6"
            ></Form>
          </FormCard>
          <ContactCard>
            <CardHeader>Reach Out</CardHeader>
            <ContactPoint>
              <ContactPointIcon>
                <i className="fas fa-map-marked-alt" />
              </ContactPointIcon>
              <ContactPointText>{pageData.address}</ContactPointText>
            </ContactPoint>

            <ContactPoint>
              <ContactPointIcon>
                <i className="fas fa-at" />
              </ContactPointIcon>
              <ContactPointText>{pageData.email}</ContactPointText>
            </ContactPoint>
          </ContactCard>
        </Wrapper>
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
          address
          email
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
