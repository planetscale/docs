import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { ButtonLink } from '../components/Common.Button'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`

const _Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 1.5em 0;
  max-width: 100%;
  width: 42%;
  background-color: #fafafa;
  border-radius: 8px;
  padding: 2em;
  align-items: center;
  box-shadow: 1px 1px 2px #eee;

  ${media.largePhone`
    width: 100%;
  `};
`

const _LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
`

const Description = styled.p`
  font-size: 1.3em;
  line-height: 1.3em;
  font-weight: 400;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 1em;
`

const ResourceLink = styled(ButtonLink)`
  align-self: flex-start;
`

export function Card({ name, logo, description, resourceLink }) {
  var backgroundLogo = {
    backgroundImage: 'url(' + logo.file.url + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  }

  return (
    <_Card key={name}>
      <_LogoContainer style={backgroundLogo}></_LogoContainer>
      <Description>{description}</Description>
      <ResourceLink href={resourceLink.url} target="_blank">
        {resourceLink.linkText}
      </ResourceLink>
    </_Card>
  )
}
