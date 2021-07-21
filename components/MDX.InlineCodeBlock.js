import React from 'react'
import { styled } from '../stitches.config'

const InlineCodeBlockContainer = styled('code', {
  padding: '0 2px',
  color: '$textPurple',
  fontSize: '1.2em',

  '& :before': {
    content: '`',
  },

  '& :after': {
    content: '`',
  },
})

export default function InlineCodeBlock({ children }) {
  return <InlineCodeBlockContainer>{children}</InlineCodeBlockContainer>
}
