import React from 'react'
import styled from 'styled-components'
import { ThumbDown, ThumbUp } from '@styled-icons/remix-line'

const FeedbackBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-primary);
  margin-top: 2em;
  padding-top: 2em;
`

const FeedbackBlockLabel = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`

const FeedbackBlockReactions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    width: 1.5em;
    color: var(--text-secondary);
    transition: transform 200ms ease;

    &:not(:last-of-type) {
      margin-right: 1em;
    }

    &:hover {
      transform: scale(1.2);
      color: var(--text-blue);
    }
  }
`

export default function FeedbackBlock() {
  return (
    <FeedbackBlockContainer>
      <FeedbackBlockLabel>Was this page useful?</FeedbackBlockLabel>
      <FeedbackBlockReactions>
        <ThumbUp />
        <ThumbDown />
      </FeedbackBlockReactions>
    </FeedbackBlockContainer>
  )
}
