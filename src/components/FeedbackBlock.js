import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThumbDown, ThumbUp, StarSmile } from '@styled-icons/remix-line'

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
  font-size: 14px;

  > svg {
    width: 1.5em;
    color: var(--text-secondary);
    transition: transform 200ms ease;

    &:not(:last-child) {
      margin-right: 1em;
    }

    &:hover {
      transform: scale(1.2);
      color: var(--text-blue);
    }
  }
`

export default function FeedbackBlock() {
  const pageURL = typeof window !== 'undefined' ? window.location.href : ''
  const [feedbackProvided, setFeedbackProvided] = useState(false)

  const feedbackValues = {
    PLUS: 1,
    MINUS: -1,
  }

  useEffect(() => {
    if (sessionStorage.getItem(pageURL)) {
      setFeedbackProvided(sessionStorage.getItem(pageURL))
    }
  })

  const logFeedback = (feedbackDelta, e) => {
    window.analytics.track('Page Feedback', {
      feedback: feedbackDelta,
    })

    sessionStorage.setItem(pageURL, true)
    setFeedbackProvided(true)
  }

  return (
    <FeedbackBlockContainer>
      <FeedbackBlockLabel>Was this page useful?</FeedbackBlockLabel>
      {!feedbackProvided ? (
        <FeedbackBlockReactions>
          <ThumbUp onClick={(e) => logFeedback(feedbackValues.PLUS, e)} />
          <ThumbDown onClick={(e) => logFeedback(feedbackValues.MINUS, e)} />
        </FeedbackBlockReactions>
      ) : (
        <FeedbackBlockReactions>
          <StarSmile />
          <span>Thank you!</span>
        </FeedbackBlockReactions>
      )}
    </FeedbackBlockContainer>
  )
}
