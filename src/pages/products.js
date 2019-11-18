import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import { media } from '../styles/media'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { Footer } from '../components/Layout.Footer'
import { Spacing } from '../components/Layout.Spacing'
import _ from 'lodash'

const _MarkdownContainer = styled.div`
  width: 100%;

  a {
    display: inline-block;
    padding: 0.8em;
    background-color: #db3d22;
    color: #ffffff;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }

  table {
    width: 100%;
    border-spacing: 10px 0px;
  }

  th {
    text-align: center;
    font-weight: 700;
    font-size: 1.1em;
    vertical-align: baseline;
    white-space: nowrap;
  }

  thead > tr > th {
    &:nth-child(n + 2) {
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: #f7f7f7;
    }
    padding: 1rem 1rem 0rem 1rem;
  }

  tbody > tr:nth-child(2) > td:first-child {
    padding: 1em;
    vertical-align: bottom;
    border-bottom: 1px solid #eee;
    font-weight: 700;
    font-size: 19px;
  }

  tbody > tr:nth-child(1) > td:nth-child(n + 2) {
    padding: 1em 1em 1em 1em;
    vertical-align: baseline;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    background-color: #f7f7f7;
    color: #666;
    text-align: center;
  }

  tbody > tr:nth-child(2) > td:nth-child(n + 2) {
    padding: 1em 1em 2em 1em;
    text-align: center;
    vertical-align: baseline;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: #f7f7f7;
  }

  tbody > tr:nth-child(n + 3) > td {
    font-weight: 400;
    padding: 1em;

    &:first-child {
      border-bottom: 1px solid #f7f7f7;
      white-space: nowrap;
    }

    &:nth-child(n + 2) {
      text-align: center;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #f7f7f7;
      color: #666;
      height: 50px;

      .fa-check {
        color: #6cae73;
      }
    }
  }

  tbody > tr:last-child {
    td:first-child {
      border-bottom: unset;
    }

    td: nth-child(n + 2) {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  ${media.largePhone`
    overflow-x: scroll;

    tbody > tr:nth-child(n + 3) > td {
      &:first-child {
        white-space: unset;
      }
    }
  `}
`

export default function ProductsPage({ data }) {
  const { allMarkdownRemark } = data
  const { frontmatter, html } = allMarkdownRemark.nodes[0]
  const templateHTML = _.template(html)
  frontmatter['checkmark'] = '<i class="fas fa-check"></i>'
  const interpolatedHTML = templateHTML(frontmatter)

  return (
    <Layout>
      <TitleAndMetaTags title={frontmatter.title} pathname="products" />
      <Hero
        title={frontmatter.title}
        subTitle={frontmatter.subtitle}
        wrap="wrap"
      ></Hero>
      <Section>
        <Spacing />
        <_MarkdownContainer
          dangerouslySetInnerHTML={{ __html: interpolatedHTML }}
        ></_MarkdownContainer>
        <Spacing />
      </Section>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query productsQuery {
    allMarkdownRemark(filter: { fields: { slug: { eq: "products" } } }) {
      nodes {
        html
        frontmatter {
          title
          subtitle
          th1
          th2
          th2_brief
          th2_cta
          th2_link
          th3
          th3_brief
          th3_cta
          th3_link
          th4
          th4_brief
          th4_cta
          th4_link
        }
      }
    }
  }
`
