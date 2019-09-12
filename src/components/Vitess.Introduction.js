import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button, ButtonLink } from '../components/Common.Button'

const _Container = styled.div`
  box-sizing: border-box;
  width: 50%;
  border-radius: 8px;
  background-color: #00000024;
  color: #fff;
  padding: 2em;
  display: flex;
  flex-direction: row;
  margin-top: 2em;

  ${media.largePhone`
    flex-direction: column;
    align-items: center;
    width: 100%;
  `}
`
const VitessLogo = styled.img`
  width: 100%;
  margin-right: 2em;

  ${media.largePhone`
    max-width: 150px;
    margin-right: 0;
    margin-bottom: 1em;
  `}
`

const Content = styled.div``
const Title = styled.h2`
  ${media.largePhone`
    text-align: center;
  `}
`
const Blurb = styled.p`
  font-weight: 400;
`

const _CustomButtonLinkWithImage = styled(ButtonLink)`
  padding: 0.2em 1em 0.2em 0;
`

const _ButtonLinkImage = styled.img`
  filter: invert(100%);
  display: inline;
  width: 3em;
`

export function Introduction({
  logo,
  title,
  description,
  buttonLabel,
  buttonLink,
}) {
  return (
    <_Container>
      <VitessLogo src={logo}></VitessLogo>
      <Content>
        <Title>{title}</Title>
        <Blurb>{description}</Blurb>
        <Button className="transparent">
          <_CustomButtonLinkWithImage href={buttonLink}>
            <_ButtonLinkImage src="/img/Slack_Mark_Monochrome_Black.svg" />
            {buttonLabel}
          </_CustomButtonLinkWithImage>
        </Button>
      </Content>
    </_Container>
  )
}
