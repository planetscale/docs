import React from 'react'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper, TourWrapper } from '../components/Layout.Wrapper'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'
import { ScreenContainer, Screen } from '../components/Tour.Screen'
import { ContactSalesCard } from '../components/Home.ContactSalesCard'
import { Footer } from '../components/Layout.Footer'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

export default function TourPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Tour" pathname="tour" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
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
      <TourWrapper>
        <ScreenContainer>{pageData.screens.list.map(Screen)}</ScreenContainer>
      </TourWrapper>
      <ContactSalesCard
        title={pageData.offerings.title}
        icon={pageData.offerings.icon}
        content={pageData.offerings.content}
      />
      <Footer
        backgroundImage={background}
        backgroundColor={'#24C8D8'}
        overlay={overlay}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query tourQuery {
    allPagesYaml(filter: { id: { regex: "/pages/tour/" } }) {
      edges {
        node {
          title
          subtitle
          screens {
            list {
              image
              title
              description
            }
          }
          offerings {
            title
            icon
            content
          }
        }
      }
    }
  }
`
