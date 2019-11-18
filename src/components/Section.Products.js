import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { StaticQuery, graphql } from 'gatsby'
import { Wrapper } from '../components/Layout.Wrapper'
import { Button, ButtonLink } from '../components/Common.Button'
import MarkdownContent from '../components/Common.MarkdownContent'

const _BackgroundContainer = styled.div`
  // background-color: #fff;
`

const _SectionHeading = styled.div`
  margin: 0 0 2em;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.largePhone`
    grid-template-columns: 1fr;
  `}
`

const _SectionLogo = styled.img`
  width: 5em;
`

const _SectionTitle = styled.h2`
  font-size: var(--exo-font-size-h2);
  font-weight: 700;
  color: #fff;
`

export const ProductContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2em;

  ${media.largePhone`
    grid-template-columns: 1fr;
  `}
`

const _Product = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2em 3em 1.5em;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  height: 428px;

  &.highlight {
    background: linear-gradient(223.52deg, #ff7a00 21.27%, #ff0f00 138.36%);
    color: #fff;
  }

  ${media.largePhone`
    flex-direction: column;
    border-bottom: 1px solid #eee;
    padding: 2em;
  `};
`

const Icon = styled.img`
  max-height: 3em;
  margin-bottom: 1.5em;
  filter: invert(80%);

  ${_Product}.highlight & {
    filter: none;
    margin-bottom: 2em;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${media.largePhone`
  `};
`

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
  margin: 0;

  ${_Product}.highlight & {
    font-size: 2em;
  }

  ${media.largePhone`
    font-size: 1.2em;
  `};
`

const Content = styled.div`
  margin-top: 0.5em;
  font-size: 1em;
  line-height: 1.5em;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
`

const _ProductBlurb = styled.p`
  flex-grow: 2;
`

export function Products() {
  return (
    <StaticQuery
      query={query}
      render={(data) => (
        <_BackgroundContainer>
          <Wrapper>
            <_SectionHeading>
              <_SectionTitle>{data.componentsYaml.title}</_SectionTitle>
            </_SectionHeading>
            <ProductContainer>
              {data.componentsYaml.products.map(Product)}
            </ProductContainer>
          </Wrapper>
        </_BackgroundContainer>
      )}
    ></StaticQuery>
  )
}

function Product({ title, icon, content, action, link }) {
  return (
    <_Product key={title}>
      <Icon src={icon} />
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <_ProductBlurb>
            <MarkdownContent html={content} />
          </_ProductBlurb>
          <Button>
            <ButtonLink href={link}>{action}</ButtonLink>
          </Button>
        </Content>
      </ContentContainer>
    </_Product>
  )
}

const query = graphql`
  query {
    componentsYaml(id: { eq: "products" }) {
      id
      sectionLogo
      title
      products {
        action
        content
        icon
        link
        title
      }
    }
  }
`
