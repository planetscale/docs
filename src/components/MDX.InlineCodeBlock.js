import React from 'react'
import styled from 'styled-components'

const InlineCodeBlockContainer = styled.span`
  background: var(--bg-tertiary);
  padding: 4px 8px;
  margin: 0 4px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: var(--text-blue);
  }
`

export default function InlineCodeBlock({ children }) {
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children)
  }

  return (
    <InlineCodeBlockContainer as="code" onClick={copyToClipboard}>
      {children}
    </InlineCodeBlockContainer>
  )
}
