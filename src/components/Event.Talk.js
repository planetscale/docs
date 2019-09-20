import React from 'react'
import styled from 'styled-components'
import { ButtonLink } from './Common.Button'
import { media } from '../styles/media'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const _Talk = styled.li`
  margin-bottom: 6em;
  max-width: 800px;
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

export function Talk({ title, presenter, startTime, endTime, blurb }) {
  return (
    <_Talk>
      <_TalkTitle>{title.title}</_TalkTitle>
      <_TalkPresenter>
        {presenter.map((node) => {
          return <_TalkPresenterName>{node.name}</_TalkPresenterName>
        })}
      </_TalkPresenter>
      <_TalkBlurb>{documentToReactComponents(blurb.json)}</_TalkBlurb>
    </_Talk>
  )
}
