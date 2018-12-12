import React from 'react'
import styled from 'styled-components'
import background from '../images/hero/home-bg.svg'
import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

export const DownloadContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1000px;
`

const _Download = styled.li`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: space-between;
  width: 100%;
  max-width: 420px;
  background-color: #eee;
  padding: 30px;
  color: #666;
  margin: 0 auto 10px;
  border-radius: 4px;

  ${media.largePhone`
    flex-direction: column;
    padding: 30px 10px;
  `};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${media.largePhone`
    padding: 0 15px;
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

const Button = styled.button`
  border-radius: 99px;
  padding: 8px 16px;
  margin-top: 10px;
  border: 0;
  background-color: #dd4327;
  color: white;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(1px);
  }
`

const ButtonLink = styled.a`
  text-decoration: none;
`

export function Download({ title, description, link }) {
  return (
    <_Download key={title}>
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <MarkdownContent html={description} />
          <Button backgroundImage={background}>
            <ButtonLink href={link}>Download</ButtonLink>
          </Button>
        </Content>
      </ContentContainer>
    </_Download>
  )
}
