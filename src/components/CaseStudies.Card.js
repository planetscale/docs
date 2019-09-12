import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { ButtonLink } from '../components/Common.Button'

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  margin: 2em 0;

  ${media.largePhone`
    grid-template-columns: 1fr;
    margin: 1em;
  `};
`

const _Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 100%;
  background-color: #fafafa;
  border-radius: 8px;
  padding: 2em;
  align-items: center;
  box-shadow: 1px 1px 2px #eee;
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
