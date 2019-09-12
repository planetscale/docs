import React, { Fragment } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Wrapper } from '../components/Layout.Wrapper'
import Header from '../components/Layout.Header'
import { headerLinks } from '../site'
import { Background } from '../components/Layout.Background'
import overlay from '../images/hero/background-texture.svg'

const _Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: top;
  position: relative;
  width: 100%;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  overflow: hidden;
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
  margin: 2em 0 1em;
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

export function Hero({ title, subTitle, wrap, children, width }) {
  return (
    <Fragment>
      <Background backgroundImage={overlay}></Background>
      <_Hero wrap={wrap}>
        <Header pages={headerLinks} />
        <Wrapper>
          <HeroTitle width={width}>{title}</HeroTitle>
          {subTitle && <HeroSubTitle>{subTitle}</HeroSubTitle>}
          {children}
        </Wrapper>
      </_Hero>
    </Fragment>
  )
}
