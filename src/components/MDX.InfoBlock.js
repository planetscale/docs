import React from 'react'
import styled from 'styled-components'
import { File4, AlarmWarning, Star } from '@styled-icons/remix-line'

const IconContainer = styled.div`
  margin-right: 1em;
  font-size: 14px;
  line-height: 24.1818px;

  &:before {
    content: '';
    margin-bottom: -0.5em;
    display: table;
  }

  &:after {
    content: '';
    margin-top: -0.5em;
    display: table;
  }

  > svg {
    width: 16px;
  }
`

const TextContainer = styled.div`
  font-size: 16px;
  line-height: 24px;

  &:before {
    content: '';
    margin-bottom: -0.3864em;
    display: table;
  }

  &:after {
    content: '';
    margin-top: -0.3864em;
    display: table;
  }
`

const ImageBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--text-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  margin: 2em 0;
  padding: 1.5em 1em;

  > ${IconContainer} > svg {
    color: ${(props) =>
      props.type === 'info'
        ? 'rgb(var(--green-600))'
        : props.type === 'warning'
        ? 'rgb(var(--orange-500))'
        : 'rgb(var(--blue-500))'};
  }
`

export default function InfoBlock(props) {
  const { type, children } = props

  return (
    <ImageBlockContainer type={type}>
      <IconContainer>
        {type === 'info' && <File4 />}
        {type === 'warning' && <AlarmWarning />}
        {type === 'tip' && <Star />}
      </IconContainer>

      <TextContainer>{children}</TextContainer>
    </ImageBlockContainer>
  )
}
