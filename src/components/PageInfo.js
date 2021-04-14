import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { LinkBlock, ButtonSecondary } from './Buttons'
import { Github } from '@styled-icons/remix-line'

const PageInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-primary);
  padding-top: 2em;
  margin-top: 2em;

  ${media.phone`
    align-items: flex-start;
    flex-direction: column;
  `}
`

const LastUpdatedDate = styled.div`
  font-size: 14px;
  color: var(--text-secondary);

  ${media.phone`
    margin-bottom: 1em;
  `}
`

export default function PageInfo({ lastUpdatedOn, slug }) {
  var lastUpdatedOnDate = new Date()
  if (lastUpdatedOn) {
    lastUpdatedOnDate = new Date(Date.parse(lastUpdatedOn))
  }

  const options = { month: 'long' }

  return (
    <PageInfoContainer>
      <LastUpdatedDate>
        Last updated on{' '}
        {new Intl.DateTimeFormat('en-US', options).format(lastUpdatedOnDate)}{' '}
        {lastUpdatedOnDate.getDate()}, {lastUpdatedOnDate.getFullYear()}
      </LastUpdatedDate>
      <LinkBlock
        href={`https://github.com/planetscale/docs.public/blob/main/content/docs${slug}.mdx`}
      >
        <ButtonSecondary>
          <Github />
          <span>Help us improve this page</span>
        </ButtonSecondary>
      </LinkBlock>
    </PageInfoContainer>
  )
}
