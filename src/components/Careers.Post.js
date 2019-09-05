import React from 'react'
import styled from 'styled-components'
import MarkdownContent from './Common.MarkdownContent'
import { Button } from './Common.Button'
import { sweepAnimation } from '../styles/animations'
import { media } from '../styles/media'

export const CareersPostContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _CareersPost = styled.details`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  outline: none;
  cursor: pointer;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  summary {
    display: flex;
    flex-direction: row;
    padding: 0.75em 3em;
    width: 100%;
    box-sizing: border-box;
    align-items: center;

    > h1 {
      flex-grow: 2;
    }
  }

  &[open] summary ~ * {
    ${sweepAnimation};
  }

  &[open] summary > i {
    transform: rotate(90deg);
  }
`

const Title = styled.h1`
  font-size: 1.75em;
  font-weight: 500;
  background-size: cover;
  display: block;
  user-select: none;

  ${media.largePhone`
    font-size: 1.25em;
  `};
`
const ButtonLink = styled.a`
  display: inline-block;
  margin: 3em 0;
  & > * {
    padding: 11px 14px;
  }
`

const Content = styled.div`
  padding: 0em 3em;
  width: 100%;
  box-sizing: border-box;
`
export function CareersPost({ node }) {
  const { title, id, content } = node
  const jobId = id.split('__')[2]

  return (
    <_CareersPost>
      <summary style={{ outline: 'none' }}>
        <Title>{title}</Title>
        <i className="fas fa-chevron-right" />
      </summary>
      <Content>
        <MarkdownContent html={content} style={{ color: 'black' }} />
        <ButtonLink
          href={`https://boards.greenhouse.io/planetscale/jobs/${jobId}#app`}
        >
          <Button> Apply for this Position</Button>
        </ButtonLink>
      </Content>
    </_CareersPost>
  )
}
