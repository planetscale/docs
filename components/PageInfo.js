import React from 'react'
import { styled } from '../stitches.config'
import { LinkBlock, ButtonSecondary } from './Buttons'
import { Github } from '@styled-icons/remix-line'

const PageInfoContainer = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '2em',
  margin: '2em 0',

  '&:after': {
    position: 'absolute',
    top: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background:
      'linear-gradient(to right,var(--border-primary),var(--bg-primary))',
  },

  '@phone': {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
})

const LastUpdatedDate = styled('div', {
  fontSize: '14px',
  color: 'var(--text-secondary)',

  '@phone': {
    marginBottom: '1em',
  },
})

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
        href={`https://github.com/planetscale/docs/blob/main/content/docs/${slug}.mdx`}
      >
        <ButtonSecondary>
          <Github />
          <span>Help us improve this page</span>
        </ButtonSecondary>
      </LinkBlock>
    </PageInfoContainer>
  )
}
