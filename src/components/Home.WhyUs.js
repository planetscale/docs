import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

import background from '../images/hero/home-bg.svg'
import linkedin from '../images/social/linkedin.png'

export const WhyUsContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;

  ${media.desktop`
    flex-direction: column;
    align-items: center;
  `};
`

const _WhyUs = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  width: 100%; //ie11 bug
  text-align: center;
  counter-increment: li;
  margin-top: 2.5em;
  box-sizing: border-box;

  &:before {
    content: counter(li);
    background-image: url(${background});
    background-size: cover;
    color: white;
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50px;
    font-weight: 500;
    opacity: 0.75;

    margin-bottom: -1.5em;
  }

  ${media.tablet`
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 2em;
  `};
`

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.25em;
  border-radius: 500px;
  background-size: cover;
  padding: 1em 2em 0 2em;
  text-align: center;
  text-transform: upercase;
`

const Content = styled.h2`
  margin-top: 0;
  color: gray;
  font-weight: 100;
  font-size: 1em;
  line-height: 1.5em;
  width: 100%; //ie11 bug
`

export function WhyUs({ title, icon, content }) {
  return (
    <_WhyUs key={title}>
      <Title>{title}</Title>
      <Content>
        <MarkdownContent html={content} />
      </Content>
    </_WhyUs>
  )
}
