import React from 'react'
import { H1 } from '../components/Typography.Headings'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { ProductContainer, Product } from '../components/Product.Products'
import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function ProductPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Products" pathname="product" />
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
        <ProductContainer>
          <H1>{pageData.products.title}</H1>
          {pageData.products.list.map(Product)}
        </ProductContainer>
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
  query productQuery {
    allPagesYaml(filter: { id: { regex: "/pages/product/" } }) {
      edges {
        node {
          title
          subtitle
          content
          products {
            title
            list {
              icon
              title
              content
              action
              link
            }
          }
        }
      }
    }
  }
`
