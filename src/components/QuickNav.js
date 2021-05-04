import React, { useEffect } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { Menu3 } from '@styled-icons/remix-line/Menu3'

const QuickNavContainer = styled.nav`
  flex-basis: 215px;
  margin: 2em 0 0;
  position: sticky;
  top: calc(90px + 2em);
  border-left: 1px solid var(--border-primary);

  ${media.tinydesktop`
    display: none;
  `}
`

const QuickNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const QuickNavHeader = styled.li`
  padding: 0 0 0 2em;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    color: var(--text-secondary);
    width: 14px;
    margin-right: 6px;
  }
`

const QuickNavListItem = styled.li`
  margin-left: -1px;
  padding: 0 0 0 2em;
  font-size: 12px;
  line-height: 20px;
  color: var(--text-secondary);
  border-left: 1px solid var(--border-primary);

  &:not(:last-child) {
    padding-bottom: 0.5em;
    padding-top: 0.5em;
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
    <QuickNavContainer>
      <QuickNavList id="quicknav">
        <QuickNavHeader>
          <Menu3 />
          On this page
        </QuickNavHeader>
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
      </QuickNavList>
    </QuickNavContainer>
  )
}
