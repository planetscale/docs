import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'
import { StaticQuery, graphql, Link } from 'gatsby'

const _Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(223.52deg, #ff0f00 21.27%, #ff7a00 138.36%);
  color: #fff;
  padding: 4em;
  display: flex;
  flex-direction: row;
  margin-top: 90px;

  ${media.largePhone`
    padding: 4em 2em 2em;
    flex-direction: column;
    align-items: left;
    width: 100%;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${media.largePhone`
    margin-bottom: 2em;
  `}
`

const _PreTitle = styled.div`
  font-size: var(--exo-font-size-pre-title);
  text-transform: uppercase;
`

const Title = styled.h2`
  font-size: var(--exo-font-size-h2);
  margin: 0;

  ${media.largePhone`
    margin-top: 0.5em;
    font-size: var(--exo-font-size-h4);
    text-align: left;
    font-weight: 700;
  `}
`
const Blurb = styled.h5`
  font-size: var(--exo-font-size-h6);
  font-weight: 400;
  margin-bottom: 0;
`

const _Button = styled.a`
  align-self: center;
  border: 1px solid;
  border-radius: 99px;
  padding: 0.75em 2em;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;

  ${media.largePhone`
    box-sizing: border-box;
    width: 100%;
  `}
`

export function ProductAnnouncement() {
  return (
    <StaticQuery
      query={staticQuery}
      render={(data) => {
        const {
          preTitle,
          title,
          blurb,
          buttonLink,
          buttonLabel,
        } = data.cardProductAnnouncement
        return (
          <_Container>
            <Content>
              <_PreTitle>{preTitle}</_PreTitle>
              <Title>{title}</Title>
              <Blurb>{blurb}</Blurb>
            </Content>
            <_Button href={buttonLink}>{buttonLabel}</_Button>
          </_Container>
        )
      }}
    ></StaticQuery>
  )
}

const staticQuery = graphql`
  query MyQuery {
    cardProductAnnouncement: componentsYaml(
      id: { eq: "card.productAnnouncement" }
    ) {
      preTitle
      title
      blurb
      buttonLink
      buttonLabel
    }
  }
`
