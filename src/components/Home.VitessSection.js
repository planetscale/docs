import React from 'react'
import styled from 'styled-components'
import MarkdownContent from '../components/Common.MarkdownContent'
import { media } from '../styles/media'
import bottomOverlay from '../images/waves.png'

const VitessContainer = styled.div`
  position: relative;
  background: linear-gradient(to bottom, white, #d8d8d8, #808284);

  ${media.largePhone`
    background: linear-gradient(to bottom, white, #ccc);
  `};
`

const _VitessSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 42px 0;
  max-width: 600px;

  ${media.largePhone`
    flex-direction: column;
    padding-bottom: 0;
    padding-left: 20px;
    padding-right: 20px;
  `};
`

const BottomOverlay = styled.img`
  position: relative;
  width: 100%;
  min-width: 700px;
  left: 0;
  height: 150px;
  bottom: -4px;
  overflow: hidden;
  z-index: 0;
`

const Icon = styled.img`
  height: 100px;

  ${media.largePhone`
    height: 80px;
    margin-bottom: 30px;
  `};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 430px;

  ${media.largePhone`
    text-align: center;
  `};
`

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;

  ${media.largePhone`
    font-size: 1.2em;
    margin-bottom: 0.4em;
  `};
`

const Content = styled.div`
  margin-top: 0.5em;
  font-weight: 400;
  font-size: 1em;
  line-height: 1.5em;
`

export function VitessSection({ title, logo, content }) {
  return (
    <VitessContainer>
      <_VitessSection>
        <Icon src={logo} />
        <ContentContainer>
          <Title>{title}</Title>
          <Content>
            <MarkdownContent html={content} />
          </Content>
        </ContentContainer>
      </_VitessSection>
      <BottomOverlay src={bottomOverlay} />
    </VitessContainer>
  )
}
