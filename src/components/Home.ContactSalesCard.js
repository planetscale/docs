import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button } from '../components/Common.Button'
import MarkdownContent from '../components/Common.MarkdownContent'

const _Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
  padding: 30px;
  max-width: 600px;
  box-shadow: 0 0 4px #d8d8d8;
  border-radius: 4px;
  background: rgb(231, 126, 42);
  background: linear-gradient(
    90deg,
    rgba(231, 126, 42, 1) 0%,
    rgba(221, 64, 39, 1) 100%
  );

  ${media.largePhone`
    flex-direction: column;
    margin: 20px;
  `};
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 300;
  margin: 0 0 15px;

  ${media.largePhone`
    font-size: 1.4em;
    font-weight: 100;
    margin-bottom: 1em;
  `};
`

const Icon = styled.img`
  height: 100px;
  margin: 0 40px;

  ${media.largePhone`
    height: 80px;
    margin-bottom: 30px;
  `};
`

const Content = styled.div`
  font-weight: 300;
  font-size: 1em;
  line-height: 1.5em;
  color: white;
`

const Actions = styled.div`
  margin-top: 10px;
  border-top: 1px solid #f5774a;
  padding-top: 10px;
`

const ButtonLink = styled.a`
  text-decoration: none;
`

export function ContactSalesCard({ title, icon, content }) {
  return (
    <_Container>
      <Icon src={icon} />

      <Content>
        <Title>{title}</Title>
        <MarkdownContent html={content} inverted={true} />
        <Actions>
          <Button>
            <ButtonLink href="/signup">Sign Up</ButtonLink>{' '}
          </Button>
        </Actions>
      </Content>
    </_Container>
  )
}
