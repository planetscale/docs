import React from 'react'
import styled from 'styled-components'

const InlineCodeBlockContainer = styled.code`
  background-color: var(--bg-tertiary);
  padding: 4px 8px;
  border-radius: 4px;
`

export default function InlineCodeBlock({ children }) {
  return <InlineCodeBlockContainer>{children}</InlineCodeBlockContainer>
}
