import React from 'react'
import styled from 'styled-components'
import { LinkBlock, ButtonSecondary } from './Buttons'

const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-primary);
  padding-top: 2em;
  margin-top: 2em;
`

const LastUpdatedDate = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`

export default function PageInfo({ lastUpdatedOn, slug }) {
  const lastUpdatedOnUTCString = new Date(
    Date.parse(lastUpdatedOn)
  ).toUTCString()

  return (
    <PageInfoContainer>
      <LastUpdatedDate>
        Last updated on {lastUpdatedOnUTCString}
      </LastUpdatedDate>
      <LinkBlock
        href={`https://github.com/planetscale/docs.public/blob/main/content/docs${slug}.mdx`}
      >
        <ButtonSecondary>Edit this page on Github</ButtonSecondary>
      </LinkBlock>
    </PageInfoContainer>
  )
}
