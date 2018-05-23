import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

import background from '../images/hero/home-bg.svg'
import linkedin from '../images/social/linkedin.png'

export const OfferingsContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _Offering = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 2em;
  width: 100%;
  max-width: 600px;

  ${media.largePhone`
    &:nth-child(odd) {
      flex-direction: row-reverse;
      padding-left: 60px;
      
    }
  `} ${media.largePhone`
    flex-direction: column;
  `};
`

const Icon = styled.img`
  height: 125px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;

  ${media.largePhone`
    text-align: center;
  `};
`

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
`

const Content = styled.div`
  margin-top: 0.5em;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.5em;
`

export function Offering({ title, icon, content }) {
  return (
    <_Offering key={title}>
      <Icon src={icon} />
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <MarkdownContent html={content} />
        </Content>
      </ContentContainer>
    </_Offering>
  )
}
