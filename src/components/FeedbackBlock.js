import React, { useEffect, useState } from 'react'
import { styled } from './styles/stitches.config'
import { ThumbDown, ThumbUp, StarSmile } from '@styled-icons/remix-line'

const FeedbackBlockContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2em',
  paddingTop: '2em',

  '&:after': {
    position: 'absolute',
    top: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background:
      'linear-gradient(to right, var(--border-primary), var(--bg-primary))',
  },
})

const FeedbackBlockLabel = styled('span', {
  fontSize: '14px',
  color: 'var(--text-secondary)',
})

const IconButton = styled('button', {
  backgroundColor: 'unset',
  border: 'unset',
  borderRadius: '50%',
  padding: '4px 7px',
  transition: 'transform 200ms ease',

  '> svg': {
    width: '1.75em',
    height: '2.25em',
    color: 'var(--text-secondary)',

    '&:not(:last-child)': {
      marginRight: '1em',
    },
  },

  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: 'var(--bg-blue)',
    cursor: 'pointer',

    '> svg': {
      color: 'var(--white)',
    },
  },
})

const FeedbackBlockReactions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '14px',
})

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
          <IconButton onClick={(e) => logFeedback(feedbackValues.PLUS, e)}>
            <ThumbUp />
          </IconButton>
          <IconButton onClick={(e) => logFeedback(feedbackValues.MINUS, e)}>
            <ThumbDown />
          </IconButton>
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
