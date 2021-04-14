import React, { Fragment } from 'react'
import styled from 'styled-components'

const HeadingWrapper = styled.div`
  margin: 0 0 4em;
  border-bottom: 1px solid var(--border-primary);
`

const HeadingContainer = styled.h1`
  font-weight: 600;
  font-size: 2.441em;
  margin: 1em 0;
`

const SubHeadingContainer = styled.p`
  font-size: 1.25em;
  line-height: 1.5em;
  width: 69ch;
  padding: 0 0 3em;
  margin: 0;
`

export default function HeadingBlock(props) {
  const { title, subtitle } = props
  return (
    <HeadingWrapper>
      <HeadingContainer>{title}</HeadingContainer>
      {subtitle && <SubHeadingContainer>{subtitle}</SubHeadingContainer>}
    </HeadingWrapper>
  )
}
