import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { media } from '../styles/media'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { SignupForm } from '../components/Home.SignupForm'
import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

const FormCard = styled.div`
  background-color: #eee;
  padding: 2em;
  border-radius: 4px;
  position: relative;
  top: -200px;
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
          backgroundImage={background}
          backgroundColor={'#24C8D8'}
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
          <FormCard>
            <SignupForm />
          </FormCard>
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
