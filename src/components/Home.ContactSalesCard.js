import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'
import MarkdownContent from '../components/Common.MarkdownContent'

const _Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1170px;
  margin-top: 1em;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(27, 31, 35, 0.15);

  ${media.largePhone`
    flex-direction: column;
    margin: 20px;
  `};
`

const _ImageContainer = styled.div`
  padding: 4em;
  border-right: 1px solid #fafafa;
`

const Icon = styled.img`
  height: 100px;
  filter: invert();

  ${media.largePhone`
    height: 80px;
    margin-bottom: 30px;
  `};
`

const Content = styled.div`
  font-weight: 300;
  font-size: 1em;
  line-height: 1.5em;
  color: black;
  padding: 0 4em;
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0 0 15px;

  ${media.largePhone`
    font-size: 1.4em;
    margin-bottom: 1em;
  `};
`

const Actions = styled.div`
  margin-top: 10px;
  padding-top: 10px;
`

export function ContactSalesCard({ title, icon, content }) {
  return (
    <_Container>
      <_ImageContainer>
        <Icon src={icon} />
      </_ImageContainer>
      <Content>
        <Title>{title}</Title>
        <MarkdownContent html={content} />
        <Actions>
          <Button>
            <ButtonLink href="/signup">Sign Up</ButtonLink>{' '}
          </Button>
        </Actions>
      </Content>
    </_Container>
  )
}
