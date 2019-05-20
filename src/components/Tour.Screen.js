// Import react instance
import React from 'react'

// Import styled component and media queries
import styled from 'styled-components'
import { media } from '../styles/media'

export const ScreenContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;

  ${media.largePhone`
  margin-bottom: 5em;
  `};
`

export const _Screen = styled.li`
  margin-bottom: 8em;
`

export const Figure = styled.figure`
  position: relative;
  margin: 0;

  ${media.largePhone`
  display: flex;
  flex-direction: column;
  align-items: center;
  `};
`
export const Image = styled.img`
  width: 100%;
  height: 100%;

  ${media.largePhone`
  position: relative;
  width: 200%;
  `};
`
export const FigCaption = styled.figcaption`
  max-width: 500px;
  background: white;
  padding: 2em;
  border: 1px solid #eee;
  box-shadow: 4px 6px 0px #dd4027;
  right: 0;
  position: absolute;
  bottom: 0;
  font-weight: 400;

  ${media.largePhone`
  right: 0;
  max-width: 75%;
  bottom: 0;
  opacity: 0.9;
  `};
`

export const Title = styled.div`
  font-weight: 500;
  font-size: 36px;

  &:before {
    content: ' ';
    height: 24px;
    width: 38px;
    background-color: #de4527;
    display: inline-block;
    margin-right: 10px;
  }

  ${media.largePhone`
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;

  &:before {
    display: none;
  }
  `};
`

export function Screen({ title, image, description }) {
  return (
    <_Screen key={title}>
      <Title>{title}</Title>
      <Figure>
        <Image src={image} />
        <FigCaption>{description}</FigCaption>
      </Figure>
    </_Screen>
  )
}
