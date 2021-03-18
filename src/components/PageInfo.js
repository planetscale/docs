import React from 'react'
import styled from 'styled-components'

const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid var(--border-primary);
  padding-top: 2em;
  margin-top: 2em;
`

const LastUpdatedDate = styled.div`
  color: var(--text-secondary);
`

export default function PageInfo({ lastUpdatedOn }) {
  const lastUpdatedOnUTCString = new Date(Date.parse(lastUpdatedOn)).toUTCString();

  return (
    <PageInfoContainer>
      <LastUpdatedDate>Last updated on {lastUpdatedOnUTCString}</LastUpdatedDate>
    </PageInfoContainer>
  )
}