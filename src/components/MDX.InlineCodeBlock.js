import React from 'react'
import styled from 'styled-components'

const InlineCodeBlockContainer = styled.code`
  background-color: var(--bg-tertiary);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--bg-tertiary);

  &:hover {
    cursor: pointer;
    border: 1px solid var(--bg-blue);
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
