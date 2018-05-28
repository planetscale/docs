import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import MarkdownContent from './Common.MarkdownContent'
import { Button } from './Common.Button'

import { sweepAnimation } from '../styles/animations'
import { media } from '../styles/media'

import chevron from '../images/chevron.png'
import background from '../images/hero/careers-bg.svg'

import { OutboundLink } from 'gatsby-plugin-google-analytics'

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
  background: #2878e0;
  margin-top: 1em;
  cursor: pointer;
  color: white;
  position: relative;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

  summary {
    padding: 0.75em 3em;
    width: 100%;
    box-sizing: border-box;

    :before {
      display: none;
    }

    &:after {
      content: ' ';
      display: block;
      position: absolute;

      background-color: rgba(255, 255, 255, 0.2);
      background-image: url(${chevron});
      background-position: center;
      background-size: 20px;
      background-repeat: no-repeat;
      border-radius: 50px;

      pointer-events: none;
      width: 50px;
      height: 50px;
      right: 1.25em;
      top: 1.25em;

      ${media.largePhone`
        font-size: 1.25em;
        width: 2em;
        height: 2em;
        top: 1em;
        right: 1em;
      `};
    }
  }

  &[open] summary ~ * {
    ${sweepAnimation};
  }

  &[open] summary:after {
    transform: rotate(180deg);
  }
`

const Title = styled.h1`
  font-size: 1.75em;
  font-weight: 500;
  background-size: cover;
  color: white;
  display: block;
  color: white;
  user-select: none;

  ${media.largePhone`
    font-size: 1.25em;
  `};
`
const ButtonLink = styled(OutboundLink)`
  display: inline-block;
  margin: 3em 0 1em;
  width: 100%;
`

const Content = styled.div`
  padding: 0em 3em;
  width: 100%;
  box-sizing: border-box;
`
export function CareersPost({ node, open = false }) {
  const { title, id, content } = node

  return (
    <_CareersPost open={open}>
      <summary style={{ outline: 'none' }}>
        <Title>{title}</Title>
      </summary>
      <Content>
        <MarkdownContent
          inverted={true}
          html={content}
          style={{ color: 'white' }}
        />
        <ButtonLink
          href={`https://boards.greenhouse.io/planetscale/jobs/${id}#app`}
        >
          <Button> Apply for this Position</Button>
        </ButtonLink>
      </Content>
    </_CareersPost>
  )
}
