import React from 'react'
import styled from 'styled-components'
import { ButtonLink } from './Common.Button'
import { media } from '../styles/media'

const _Talk = styled.li`
  margin-bottom: 3em;
`

const _TalkTitle = styled.h3``

const _TalkPresenter = styled.p``

const _TalkPresenterName = styled.span`
  &:not(:last-child)::after {
    content: ', ';
  }
`

export function Talk({ title, presenter }) {
  return (
    <_Talk>
      <_TalkTitle>{title.title}</_TalkTitle>
      <_TalkPresenter>
        {presenter.map((node) => {
          return <_TalkPresenterName>{node.name}</_TalkPresenterName>
        })}
      </_TalkPresenter>
    </_Talk>
  )
}
