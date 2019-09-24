import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Section } from '../components/Layout.Wrapper'
import { Hero } from '../components/Common.Hero'
import { EventList, Event } from '../components/Event.ListItem'
import { Footer } from '../components/Layout.Footer'

export default function EventsPage({ data }) {
  const { pageData, events } = data

  return (
    <Layout>
      <TitleAndMetaTags title={pageData.title} pathname="events" />
      <Hero
        title={pageData.title}
        subTitle={pageData.subtitle}
        wrap="wrap"
      ></Hero>
      <Section>
        <EventList>
          {events.nodes.map((event, index) => {
            return <Event key={index} {...event} />
          })}
        </EventList>
      </Section>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query eventsQuery {
    events: allContentfulEvent(sort: { fields: [startDate], order: ASC }) {
      nodes {
        title
        type
        startDate
        endDate
        venue
        description {
          json
        }
        eventLink {
          url
        }
        talks {
          title {
            title
          }
          presenter {
            name
          }
          startTime(formatString: "HH:MM")
          endTime(formatString: "HH:MM, DD MMM")
          blurb {
            json
          }
        }
      }
    }
    pageData: pagesYaml(id: { eq: "events" }) {
      title
      subtitle
    }
  }
`
