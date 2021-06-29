import React from 'react'
import { styled } from '../stitches.config'

const InlineCodeBlockContainer = styled('code', {
  background: '$bgSecondary',
  padding: '4px 8px',
  margin: '0 4px',
  borderRadius: '4px',
  lineHeight: '28px',
})

export default function InlineCodeBlock({ children }) {
  return <InlineCodeBlockContainer>{children}</InlineCodeBlockContainer>
}
