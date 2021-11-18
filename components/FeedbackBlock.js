import React, { useEffect, useState } from 'react'

import Button from './Button'

export default function FeedbackBlock() {
  const pageURL = typeof window !== 'undefined' ? window.location.href : ''
  const [feedbackProvided, setFeedbackProvided] = useState(false)

  const feedbackValues = {
    PLUS: 1,
    MINUS: -1
  }

  useEffect(() => {
    if (sessionStorage.getItem(pageURL)) {
      setFeedbackProvided(sessionStorage.getItem(pageURL))
    } else {
      setFeedbackProvided(false)
    }
  }, [pageURL])

  const logFeedback = (feedbackDelta) => {
    window.analytics.track('page-feedback', {
      feedback: feedbackDelta,
      url: pageURL
    })

    sessionStorage.setItem(pageURL, true)
    setFeedbackProvided(true)
  }

  return (
    <div className='flex items-center mt-4 mb-4'>
      <strong className='mr-1'>Was this page useful?</strong>
      {!feedbackProvided ? (
        <>
          <Button
            size='xsmall'
            variant='secondary'
            className='mr-1'
            onClick={(e) => logFeedback(feedbackValues.PLUS, e)}
          >
            Yes
          </Button>
          <Button size='xsmall' variant='secondary' onClick={(e) => logFeedback(feedbackValues.MINUS, e)}>
            No
          </Button>
        </>
      ) : (
        <span>Thank you!</span>
      )}
    </div>
  )
}
