import React from 'react'
import { Button } from './Common.Button'
import styled from 'styled-components'
import { media } from '../styles/media'

const ButtonLink = styled.a`
  text-decoration: none;
`

const _ConferenceBanner = styled.div`
  display: flex;
  color: white;
  line-height: 1.3;
  z-index: 2;
  margin: 8em 0 -5em;
  padding: 2em;
  width: 100%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent);
  max-width: 1170px;
  box-sizing: border-box;

  ${media.largePhone`
    background: rgba(255, 255, 255, 0.3);
    flex-direction: column;
  `};
`

const EventData = styled.div``

const ConferenceImageLink = styled.a`
  display: inline-block;
  padding: 0 2em 0 0;
  border-right: 1px solid;
  margin-right: 2em;
  height: 100%;
  display: flex;

  ${media.largePhone`
    width: 100%;
    border-right: 0;
    margin: 0px 0 2em;
    border-bottom: 1px solid;
    padding: 0px 0 2em 0px;
    justify-content: center;
  `};
`

const ConferenceImage = styled.img`
  border: none;
  width: 80px;
  filter: grayscale(100%) brightness(0%) invert(100%);
  align-self: center;
`

const EventTitle = styled.div`
  font-size: 24px;
  font-weight: 500;

  ${media.largePhone`
    font-size: 20px;
    text-align: left;
  `}
`

const EventDate = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;

  ${media.largePhone`
    margin-top: 1em;
    text-align: left;
  `}
`

const ActionContainer = styled.div`
  display: flex;
  margin-top: 1em;

  ${media.largePhone`
    flex-direction: column;
    align-items: flex-start;
  `} & > *:not(:first-child) {
    margin-left: 1.5em;
    position: relative;

    ${media.largePhone`
      margin: 1.5em 0 0;
    `};
  }
`

export default function ConferenceBanner(props) {
  return (
    <_ConferenceBanner>
      <ConferenceImageLink href={props.data.banner.link}>
        <ConferenceImage
          src={props.data.banner.img}
          alt={props.data.banner.alt}
        />
      </ConferenceImageLink>
      <EventData>
        <EventTitle>{props.data.banner.title}</EventTitle>
        <EventDate>{props.data.banner.date}</EventDate>
        <ActionContainer>
          {props.data.buttons &&
            props.data.buttons.map((button) => {
              return (
                <Button key={button.link}>
                  <ButtonLink href={button.link}>{button.text}</ButtonLink>
                </Button>
              )
            })}
        </ActionContainer>
      </EventData>
    </_ConferenceBanner>
  )
}
