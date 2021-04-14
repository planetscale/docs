import React from 'react'
import styled from 'styled-components'

const HeadingContainer = styled.h1`
  font-weight: 600;
  font-size: 2.441em;
  margin: 1em 0;
`

export default function HeadingBlock(props) {
  const { title } = props
  return <HeadingContainer>{title}</HeadingContainer>
}
