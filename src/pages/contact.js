import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { EmailForm } from '../components/Home.EmailForm'
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

const ContactCard = styled.div`
  background-color: #eee;
  padding: 2em 2em 1em;
  border-radius: 4px;
  position: relative;
  top: -200px;
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
  font-weight: 300;
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
  font-weight: 300;
`

export default function ContactPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Contact" pathname="contact" />
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
          <EmailForm />
        </FormCard>
        <ContactCard>
          <CardHeader>Reach Out</CardHeader>
          <ContactPoint>
            <ContactPointIcon>
              <i class="fas fa-map-marked-alt" />
            </ContactPointIcon>
            <ContactPointText>
              278 Hope St, Mountain View, California 94041
            </ContactPointText>
          </ContactPoint>

          <ContactPoint>
            <ContactPointIcon>
              <i class="fas fa-at" />
            </ContactPointIcon>
            <ContactPointText>contact@planetscale.com</ContactPointText>
          </ContactPoint>
        </ContactCard>
      </Wrapper>
      <Footer
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query contactQuery {
    allPagesYaml(filter: { id: { regex: "/pages/contact/" } }) {
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
