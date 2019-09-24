import React from 'react'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const TalkContainer = styled.div``

const _Talk = styled.li`
  max-width: 800px;

  &:not(:last-child) {
    margin-bottom: 6em;
  }
`

const _TalkTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 0.5em;
`

const _TalkPresenter = styled.div`
  font-size: 18px;
  color: #999;
  margin-bottom: 2em;
`

const _TalkPresenterName = styled.span`
  &:not(:last-child)::after {
    content: ', ';
  }
`

const _TalkBlurb = styled.div`
  line-height: 1.3em;
`

export function Talk({ title, presenter, blurb }) {
  return (
    <_Talk key={title.title}>
      <_TalkTitle>{title.title}</_TalkTitle>
      <_TalkPresenter>
        {presenter.map((node) => {
          return (
            <_TalkPresenterName key={node.name}>{node.name}</_TalkPresenterName>
          )
        })}
      </_TalkPresenter>
      <_TalkBlurb>{documentToReactComponents(blurb.json)}</_TalkBlurb>
    </_Talk>
  )
}
