import React from 'react'
import { styled } from './styles/stitches.config'

const InlineCodeBlockContainer = styled('code', {
  background: 'var(--bg-tertiary)',
  padding: '4px 8px',
  margin: '0 4px',
  borderRadius: '4px',

  '&:hover': {
    cursor: 'pointer',
    color: 'var(--white)',
    background: 'var(--text-blue)',
  },
})

export default function InlineCodeBlock({ children }) {
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children)
  }

  return (
    <InlineCodeBlockContainer onClick={copyToClipboard}>
      {children}
    </InlineCodeBlockContainer>
  )
}
