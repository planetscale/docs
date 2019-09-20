import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'
import { StaticQuery, graphql } from 'gatsby'
import { Section } from '../components/Layout.Wrapper'

const _BackgroundContainer = styled.div`
  background: linear-gradient(223.52deg, #ff7a00 21.27%, #ff0f00 138.36%);
`

const _BannerLayout = styled.div`
  display: flex;
  align-items: center;

  ${media.largePhone`
    flex-direction: column;
    align-items: start;
    padding: 1rem;
  `}
`

const _BannerTag = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: #ff0f00;
  justify-self: start;
  margin-right: 1rem;
`

const _BannerText = styled.p`
  color: #fff;
  flex-grow: 2;
`

const _Link = styled(ButtonLink)`
  color: white;
`

export function EventBanner() {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const eventDetails = data.allContentfulEvent.edges[0].node
        const eventLink = `/events/#${eventDetails.title.replace(/[ ]/gi, '')}`
        return (
          <_BackgroundContainer>
            <Section background={'transparent'}>
              <_BannerLayout>
                <_BannerTag>Event</_BannerTag>
                <_BannerText>
                  Join us at {eventDetails.title} from {eventDetails.startDate}{' '}
                  to {eventDetails.endDate}
                </_BannerText>
                <Button className="small">
                  <_Link href={eventLink}>
                    Details&nbsp;&nbsp;
                    <i className="fas fa-chevron-right" />
                  </_Link>
                </Button>
              </_BannerLayout>
            </Section>
          </_BackgroundContainer>
        )
      }}
    ></StaticQuery>
  )
}

const query = graphql`
  query {
    allContentfulEvent(limit: 1, sort: { fields: [startDate], order: ASC }) {
      edges {
        node {
          title
          startDate(formatString: "DD MMM")
          endDate(formatString: "DD MMM, YYYY")
          venue
        }
      }
    }
  }
`
