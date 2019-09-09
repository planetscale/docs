import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'

export const DownloadContainer = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: normal;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2em;
  grid-column-gap: 2em;

  ${media.largePhone`
    grid-template-columns: 1fr;
  `}
`

const _Download = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  padding: 30px;
  color: #333;
  border-radius: 4px;

  ${media.largePhone`
    flex-direction: column;
    padding: 30px 10px;
  `};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${media.largePhone`
    padding: 0 15px;
  `};
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 0.5em;

  ${media.largePhone`
    font-size: 1.2em;
    font-weight: 700;
  `};
`

const Blurb = styled.p`
  margin: 0 0 1em;
`

const DownloadButton = styled(Button)`
  width: min-content;
`

export function Download({ title, description, link }) {
  return (
    <_Download key={title}>
      <ContentContainer>
        <Title>{title}</Title>
        <Blurb>{description}</Blurb>
        <DownloadButton className="clear">
          <ButtonLink href={link}>Download</ButtonLink>
        </DownloadButton>
      </ContentContainer>
    </_Download>
  )
}
