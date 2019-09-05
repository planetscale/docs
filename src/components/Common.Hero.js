import React from 'react'
import styled from 'styled-components'
import { fadeInAndRotateAnimation } from '../styles/animations'
import { media } from '../styles/media'
import { Wrapper } from '../components/Layout.Wrapper'
import Header from '../components/Layout.Header'
import { headerLinks } from '../site'

const _Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: top;
  position: relative;
  width: 100%;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  background: linear-gradient(270deg, #d92727 0%, #f0562b 100%);
`

const _BackgroundHero = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;

  ${media.largePhone`
    opacity: 0.4;
  `}
`

const HeroTitle = styled.h1`
  text-shadow: 0 0 50px rgba(0, 0, 0, 0.175);
  font-size: 4em;
  color: #fff;
  margin: 0;
  font-weight: 600;
  width: ${(props) => props.width || '75%'};
  text-align: ${(props) => props.align || 'left'};

  ${media.largePhone`
    width: 100%;
		font-size: 2.5em;
    padding-top: 1em;
    padding-left: 0;
    padding-right: 0;
  `};
`

const HeroSubTitle = styled.h2`
  margin: 2em 0;
  font-size: 1.5em;
  line-height: 1.5em;
  width: 66%;
  color: #fff;
  text-align: ${(props) => props.align || 'left'};

  ${media.largePhone`
    width: 100%;
		font-size: 1em;
  `};
`

const BottomRightImage = styled.img`
  position: absolute;
  right: 0vw;
  top: 12vh;
  width: 50vw;
  ${fadeInAndRotateAnimation};

  ${media.largePhone`
    position: relative;
    width: 100vw;
  `}
`

export function Hero({ overlay, title, subTitle, wrap, children, width }) {
  return (
    <_Hero wrap={wrap}>
      {overlay && (
        <_BackgroundHero>
          <BottomRightImage src={overlay} />
        </_BackgroundHero>
      )}
      <Header pages={headerLinks} />
      <Wrapper>
        <HeroTitle width={width}>{title}</HeroTitle>
        {subTitle && <HeroSubTitle>{subTitle}</HeroSubTitle>}
        {children}
      </Wrapper>
    </_Hero>
  )
}
