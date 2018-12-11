import React from 'react'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { QAndAContainer, QAndA } from '../components/Faq.QAndA'
import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/team-bg.svg'
import overlay from '../images/hero/team-overlay.svg'

export default function FaqPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="FAQ" pathname="faq" />
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
        <QAndAContainer>
          {data.faq.edges.map((edge) => {
            const { node } = edge
            const { html, frontmatter } = node
            const { question } = frontmatter

            return <QAndA question={question} answer={html} />
          })}
        </QAndAContainer>
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
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { regex: "/pages/faq/" } }) {
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
