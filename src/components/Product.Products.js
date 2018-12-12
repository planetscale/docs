import React from 'react'
import styled from 'styled-components'
import background from '../images/hero/home-bg.svg'
import MarkdownContent from '../components/Common.MarkdownContent'

import { media } from '../styles/media'

export const ProductContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _Product = styled.li`
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

const Icon = styled.img`
  width: 80px;
  height: 100%;

  ${media.largePhone`
    width: 80px;
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
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
  }

  &:active {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(1px);
  }
`

const ButtonLink = styled.a`
  text-decoration: none;
`

export function Product({ title, icon, content, action, link }) {
  return (
    <_Product key={title}>
      <Icon src={icon} />
      <ContentContainer>
        <Title>{title}</Title>
        <Content>
          <MarkdownContent html={content} inverted={true} />
          <Button backgroundImage={background}>
            <ButtonLink href={link}>{action}</ButtonLink>
          </Button>
        </Content>
      </ContentContainer>
    </_Product>
  )
}
