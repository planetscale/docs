import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

const _Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #3c3c3c;
  margin-top: 1em;
  padding: 3em;

  ${media.largePhone`
    padding: 3em 1em;
    border: 0;
    border-bottom: 1px solid #666;
  `};
`

const _Icon = styled.i`
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #f0562b;
`

const _Title = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
  margin: 0;

  ${media.largePhone`
    font-size: 1.2em;
  `};
`

const _Image = styled.img`
  width: 100%;
  margin: 5em 0;
`

export function Architecture({ title, image }) {
  return (
    <_Container>
      <_Icon className="fas fa-project-diagram" />
      <_Title>{title}</_Title>
      <_Image src={image}></_Image>
    </_Container>
  )
}
