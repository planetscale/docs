import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'

const HeadingWrapper = styled.div`
  margin: 0 0 4em;
  border-bottom: 1px solid var(--border-primary);

  ${media.phone`
    border-bottom: unset;
    margin-bottom: 0;
  `}
`

const HeadingContainer = styled.h1`
  font-weight: 600;
  font-size: 2.441em;
  margin: 1em 0;
`

const SubHeadingContainer = styled.p`
  font-size: 1.25em;
  line-height: 1.5em;
  max-width: 69ch;
  padding: 0 0 3em;
  margin: 0;

  ${media.phone`
    padding-bottom: 2em;
  `}
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
