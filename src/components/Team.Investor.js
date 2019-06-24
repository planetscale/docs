import React from 'react'
import styled from 'styled-components'

import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/team-bg.svg'

export const InvestorContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _Investor = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em;
  max-width: 325px;
`

const Name = styled.h2`
  font-size: 1.5em;
  font-weight: 100;
  background-image: url(${background});
  background-size: cover;
  padding: 1em 2em;
  color: white;
`

const Image = styled.img`
  border-radius: 300px;
  width: 200px;
  margin: 2em 0;
`

export function Investor({ name, image, bio }) {
  return (
    <_Investor key={name}>
      <Name>{name}</Name>
      <Image src={image} />
      <MarkdownContent html={bio} />
    </_Investor>
  )
}
