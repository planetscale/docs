import React from 'react'
import styled from 'styled-components'
import { ButtonLink } from './Common.Button'
import { media } from '../styles/media'
import { TalkContainer, Talk } from '../components/Event.Talk'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { format, isSameDay } from 'date-fns'

export const EventList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const _Event = styled.li`
  margin: 0;
  padding: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  ${media.largePhone`
    padding: 2em;
  `};
`

const Type = styled.div`
  margin-bottom: 1em;
  font-weight: 300;
  font-size: 0.9em;
  color: #333;
  background-color: #eee;
  padding: 0.2em 0.4em;
  border-radius: 4px;
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
`

const _Date = styled.p`
  font-weight: 400;
  font-size: 1.1em;
  color: #555;
  margin: 0;
  padding: 1em 0 0;
`

const _Description = styled.div`
  max-width: 800px;
  margin-bottom: 0;
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

export function Event({
  title,
  type,
  startDate,
  endDate,
  eventLink,
  venue,
  talks,
  description,
}) {
  const startDateInstance = new Date(startDate)
  const startDateInstanceOffset = new Date(
    startDateInstance.valueOf() +
      startDateInstance.getTimezoneOffset() * 60 * 1000
  )
  const endDateInstance = new Date(endDate)
  const endDateInstanceOffset = new Date(
    endDateInstance.valueOf() + endDateInstance.getTimezoneOffset() * 60 * 1000
  )
  const compareDates = isSameDay(startDateInstance, endDateInstance)
  return (
    <_Event key={title} id={title.replace(/[ ]/gi, '')}>
      <Type>{type}</Type>
      <ButtonLink href={eventLink.url}>
        <Title>{title}</Title>
      </ButtonLink>

      <_Date>
        {compareDates
          ? `${format(startDateInstanceOffset, 'd LLL, yyy')}`
          : `${format(startDateInstanceOffset, 'd LLL')} - ${format(
              endDateInstanceOffset,
              'd LLL, yyy'
            )}`}{' '}
        · {venue}
      </_Date>

      {/* only show the description of the event if there are no underlying talks */}
      {!talks && (
        <_Description>
          {documentToReactComponents(description.json)}
        </_Description>
      )}
      {talks && (
        <TalkContainer>
          <TalksHeading>Talks</TalksHeading>
          <Talks>{talks.map(Talk)}</Talks>
        </TalkContainer>
      )}
    </_Event>
  )
}
