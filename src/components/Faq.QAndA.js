import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

import MarkdownContent from './Common.MarkdownContent'

export const QAndAContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 5em 0 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _QAndA = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em;
  width: 100%;

  ${media.largePhone`
    flex-direction: column;
    margin: 0;
    align-items: center;
  `};
`

const Content = styled.div`
  margin: 0 3em;
  background-color: #fafafa;
  padding: 2em;
  border-radius: 4px;
  width: 100%;

  ${media.largePhone`
    margin: 0 0 3em;
    padding: 0 0 1.5em;
    border-bottom: 1px solid #eee;
  `};
`

const Question = styled.h2`
  font-size: 1.3em;
  font-weight: 700;
  margin: 0 0 20px;

  ${media.largePhone`
    text-align: center;
  `};
`

export function QAndA({ question, answer }) {
  return (
    <_QAndA key={question}>
      <Content>
        <Question>{question}</Question>
        <MarkdownContent html={answer} />
      </Content>
    </_QAndA>
  )
}
