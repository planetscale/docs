import React, { useEffect } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'

const QuickNavContainer = styled.ul`
  flex-basis: 300px;
  padding: 0;
  margin: 2em 0 0;
  list-style: none;
  position: sticky;
  top: calc(88px + 2em);
  border-left: 1px solid var(--border-primary);

  ${media.tinydesktop`
    display: none;
  `}
`

const QuickNavHeader = styled.li`
  padding: 0 0 0 2em;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 1.5em;
`

const QuickNavListItem = styled.li`
  margin-left: -1px;
  padding: 0 0 0 2em;
  font-size: 12px;
  line-height: 20px;
  color: var(--text-secondary);
  border-left: 1px solid var(--border-primary);

  &:not(:last-child) {
    padding-bottom: 1em;
  }

  &.active {
    border-left: 1px solid var(--gray-400);
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
    return text
      .toLowerCase()
      .split(':')
      .join('')
      .split('.')
      .join('')
      .split('(')
      .join('')
      .split(' ')
      .join('-')
  }

  useEffect(() => {
    const config = {
      rootMargin: '-90px 0px 0px 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')

        if (entry.isIntersecting) {
          console.log(id)
          document
            .querySelector(`ul#quicknav > li > a[href="#${id}"]`)
            .parentElement.classList.add('active')
        } else if (!entry.isIntersecting) {
          document
            .querySelector(`ul#quicknav > li > a[href="#${id}"]`)
            .parentElement.classList.remove('active')
        }
      })
    }, config)

    document.querySelectorAll('h2[id]').forEach((h2) => {
      observer.observe(h2)
    })
  })

  return (
    <QuickNavContainer id="quicknav">
      <QuickNavHeader>On this page</QuickNavHeader>
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
