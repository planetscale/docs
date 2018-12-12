import React from 'react'
import styled from 'styled-components'
import background from '../images/hero/home-bg.svg'
import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

export const FeatureContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 40px;
`

const _Feature = styled.li`
  display: flex;
  flex-direction: column;
  padding: 30px;
  max-width: 300px;

  ${media.largePhone`
    flex-direction: column;
    border-bottom: 1px solid #eee;
    padding: 0 0 50px;
  `};
`

const Icon = styled.img`
  margin-bottom: 15px;
  width: 40px;

  ${media.largePhone`
    margin: 30px auto 15px;
  `};
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

  ${media.largePhone`
    font-size: 1.2em;
  `};
`

const Content = styled.div`
  margin-top: 0.5em;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.5em;
`

export function Feature({ title, icon, content, action }) {
  return (
    <_Feature key={title}>
      <Icon src={icon} />
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <MarkdownContent html={content} />
        </Content>
      </ContentContainer>
    </_Feature>
  )
}
