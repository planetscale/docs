import React from 'react'
import { Button } from './Common.Button'
import styled from 'styled-components'
import { media } from '../styles/media'

const ButtonLink = styled.a`
  text-decoration: none;
`

const _ConferenceBanner = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  line-height: 1.3;
  z-index: 2;
  margin: 8em 0 -5em;
  padding: 2em;

  h2 {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
  }
`

const ActionContainer = styled.div`
  display: flex;

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

export const ConferenceImageLink = styled.a`
  display: inline-block;
  width: 200px;
  padding: 0 0 1em;

  ${media.largePhone`
    width: 100%;
  `};
`

export const ConferenceImageDate = styled.h3`
  font-weight: 400;
  text-align: left;
  margin-top: 0.5em;
`

export const ConferenceImage = styled.img`
  border: none;
`

export default function ConferenceBanner(props) {
  return (
    <_ConferenceBanner>
      {props.children}
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
    </_ConferenceBanner>
  )
}
