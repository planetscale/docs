import React from 'react'
import styled from 'styled-components'
import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

export const ReleaseContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _Release = styled.li`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  background: rgb(231, 126, 42);
  background: linear-gradient(
    90deg,
    rgba(231, 126, 42, 1) 0%,
    rgba(221, 64, 39, 1) 100%
  );
  padding: 30px;
  margin: 0 auto 20px;
  border-radius: 4px;
  color: white;

  ${media.largePhone`
    flex-direction: column;
    border-bottom: 1px solid #eee;
    padding: 0 0 50px;
  `};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;

  ${media.largePhone`
    padding: 0 30px;
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

export function Release({ title, icon, content, action, link }) {
  return (
    <_Release key={title}>
      <ContentContainer>
        <Title>
          <a href={link}>{title}</a>
        </Title>
        <Content>
          <MarkdownContent html={content} inverted={true} />
        </Content>
      </ContentContainer>
    </_Release>
  )
}
