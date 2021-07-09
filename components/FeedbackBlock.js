import React, { useEffect, useState } from 'react'
import { styled } from '../stitches.config'
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
    background: 'linear-gradient(to right, $borderPrimary, $bgPrimary)',
  },
})

const FeedbackBlockLabel = styled('span', {
  fontSize: '14px',
  color: '$textSecondary',
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
    color: '$textSecondary',

    '&:not(:last-child)': {
      marginRight: '1em',
    },
  },

  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: '$textBlue',
    cursor: 'pointer',

    '> svg': {
      color: '$textPrimary',
    },
  },
})

const FeedbackBlockReactions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '14px',
  color: '$textSecondary',

  '> svg': {
    width: '1.5em',
    height: '2.25em',
    color: '$textSecondary',

    '&:not(:last-child)': {
      marginRight: '0.5em',
    },
  },
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
    } else {
      setFeedbackProvided(false)
    }
  })

  const logFeedback = (feedbackDelta, e) => {
    window.analytics.track('page-feedback', {
      feedback: feedbackDelta,
      url: pageURL,
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
