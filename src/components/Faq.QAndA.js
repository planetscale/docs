import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { sweepAnimation } from '../styles/animations'
import MarkdownContent from './Common.MarkdownContent'

export const QAndAContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _QAndA = styled.li`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #f7f7f7;
  }

  ${media.largePhone`
    flex-direction: column;
    margin: 0;
    align-items: center;
  `};
`

const DetailContainer = styled.details`
  summary {
    display: flex;
    flex-direction: row;
    padding: 2.5em 0em;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    color: #666;

    > h2 {
      flex-grow: 2;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &[open] summary ~ * {
    ${sweepAnimation};
  }

  &[open] summary > i {
    transform: rotate(45deg);
  }
`

const Content = styled.div`
  padding: 0 0 2em;
  border-radius: 4px;
  width: 100%;

  ${media.largePhone`
    margin: 0 0 3em;
    padding: 0 0 1.5em;
    border-bottom: 1px solid #eee;
  `};
`

const Question = styled.h2`
  margin: 0;
  font-size: var(--exo-font-size-h6);
  font-weight: 500;
  color: black;

  ${media.largePhone`
    text-align: center;
  `};
`

export function QAndA({ question, answer }) {
  return (
    <_QAndA key={question}>
      <DetailContainer>
        <summary style={{ outline: 'none' }}>
          <Question>{question}</Question>
          <i className="fas fa-plus" />
        </summary>
        <Content>
          <MarkdownContent html={answer} />
        </Content>
      </DetailContainer>
    </_QAndA>
  )
}
