import React from 'react'
import styled from 'styled-components'
import { ButtonLink } from './Common.Button'
import { media } from '../styles/media'
import { Talk } from '../components/Event.Talk'

export const EventList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const _Event = styled.li`
  margin: 0;
  padding: 3em 0 0;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  ${media.largePhone`
    padding: 2em;
  `};
`

const Venue = styled.div`
  margin-bottom: 1em;
  font-weight: 300;
  font-size: 0.9em;
  color: #666;
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
`

const Date = styled.p`
  font-weight: 400;
  font-size: 1.1em;
  color: #555;
  margin: 0;
  padding: 1em 0 0;
`

const TalksHeading = styled.h3`
  margin-top: 3em;
  font-weight: 300;
  font-size: 1em;
  color: #666;
`

const Talks = styled.ul`
  list-style: none;
  padding: 0;
`

export function Event({ title, startDate, endDate, eventLink, venue, talks }) {
  return (
    <_Event key={title} id={title.replace(/[ ]/gi, '')}>
      <Venue>{venue}</Venue>
      <ButtonLink href={eventLink.url}>
        <Title>{title}</Title>
      </ButtonLink>
      <Date>
        {startDate} - {endDate}
      </Date>
      <TalksHeading>Talks</TalksHeading>
      <Talks>{talks.map(Talk)}</Talks>
    </_Event>
  )
}
