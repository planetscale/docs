import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { Link } from 'gatsby'

const QuickNavContainer = styled.ul`
  flex-basis: 300px;
  margin: 0 0 0 4em;
  padding: 0;
  list-style: none;
  position: sticky;
  top: calc(92px + 4em);

  ${media.phone`
    display: none;
  `}
`

const QuickNavHeader = styled.li`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 1.5em;
`

const QuickNavListItem = styled.li`
  font-size: 12px;
  line-height: 20px;
  color: var(--text-secondary);

  &:not(:last-child) {
    margin-bottom: 1em;
  }
`

const AnchorLink = styled.a`
  color: var(--text-secondary);
  text-decoration: unset;

  &:hover {
    color: var(--text-primary);
  }
`

export default function QuickNav({ subNavPages }) {
  function createKebabCase(text) {
    return text.toLowerCase()
    // .replaceAll(':', '')
    // .replaceAll('.', '')
    // .replaceAll('(', '')
    // .replaceAll(' ', '-')
  }

  return (
    <QuickNavContainer>
      <QuickNavHeader>Table of contents</QuickNavHeader>
      {subNavPages.length > 0 &&
        subNavPages.map((page) => {
          return (
            <QuickNavListItem>
              <AnchorLink href={`#${createKebabCase(page.value)}`}>
                {page.value}
              </AnchorLink>
            </QuickNavListItem>
          )
        })}
    </QuickNavContainer>
  )
}
