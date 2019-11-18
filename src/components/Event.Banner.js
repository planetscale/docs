import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'
import { StaticQuery, graphql } from 'gatsby'
import { Section } from '../components/Layout.Wrapper'

const _BackgroundContainer = styled.div`
  background: linear-gradient(223.52deg, #ff7a00 21.27%, #ff0f00 138.36%);
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`

const _BannerLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1em 0 1.23em;

  ${media.largePhone`
    flex-direction: column;
    align-items: start;
    padding: 1rem 1em 0.5em;
    width: unset;
  `}
`

const _BannerDescription = styled.div`
  flex-grow: 2;
`

const _BannerLead = styled.h3`
  color: #fff;
  font-size: var(--exo-font-size-h4);
  margin: 0;

  ${media.largePhone`
    font-size: var(--exo-font-size-h6);
  `}
`

const _BannerBlurb = styled.p`
  color: #fff;
  margin: 0.5em 0 0;

  ${media.largePhone`
    margin: 1em 0;
  `}
`

const _Link = styled(ButtonLink)`
  color: white;
  font-size: var(--exo-font-size-h5);
  text-transform: uppercase;

  ${media.largePhone`
    font-size: var(--exo-font-size-body);
  `}
`

export function EventBanner({ isVisible }) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const eventDetails = data.allContentfulEvent.edges[0].node
        const eventLink = `/events/#${eventDetails.title.replace(/[ ]/gi, '')}`
        return (
          <_BackgroundContainer isVisible={isVisible}>
            <Section background={'transparent'}>
              <_BannerLayout>
                <_BannerDescription>
                  <_BannerLead>Attending KubeCon San Diego ? </_BannerLead>
                  <_BannerBlurb>
                    Drop by booth SE39 or attend one of our speaking sessions.
                  </_BannerBlurb>
                </_BannerDescription>
                <_Link href={eventLink}>
                  <i className="fas fa-chevron-right" />
                  &nbsp;&nbsp;Sessions
                </_Link>
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
    allContentfulEvent(
      limit: 1
      sort: { fields: [startDate], order: ASC }
      filter: { fields: { isPast: { eq: false } } }
    ) {
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
