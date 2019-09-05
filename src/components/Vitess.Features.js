import React from 'react'
import styled from 'styled-components'
import MarkdownContent from '../components/Common.MarkdownContent'
import { media } from '../styles/media'

export const FeatureBackground = styled.div`
  background-color: #333;
  color: #fff;
`

export const FeatureContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em 1em;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 2em;

  ${media.largePhone`
    grid-template-columns: 1fr;
    grid-gap: 0em 0em;
  `}
`

const _Feature = styled.li`
  display: flex;
  flex-direction: column;
  padding: 3em;
  border: 1px solid #3c3c3c;
  background-color: #333;
  transition: transform 500ms, background-color 500ms;

  &:hover {
    background-color: #3c3c3c;
    transform: scale(1.04);
  }

  ${media.largePhone`
    padding: 3em 1em;
    border: 0;
    border-bottom: 1px solid #666;

    &:hover {
      background-color: unset;
    }
  `};
`

const Icon = styled.img`
  margin-bottom: 1em;
  width: 2em;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${media.largePhone`
    text-align: left;
  `};
`

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
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

export function Feature({ title, icon, content }) {
  return (
    <_Feature key={title}>
      <Icon
        src={icon}
        alt={
          'Icon to visually describe the Vitess & PlanetScale feature of ' +
          title
        }
      />
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <MarkdownContent html={content} inverted={true} />
        </Content>
      </ContentContainer>
    </_Feature>
  )
}
