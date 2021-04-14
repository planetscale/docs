import React from 'react'
import styled from 'styled-components'
import { ArrowRightS } from '@styled-icons/remix-line'

const NextBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-primary);
  /* border-radius: 6px; */
  margin: 0;
  padding: 2em 0 0;
`

const NextBlockHeading = styled.h2`
  margin: 0 !important;
  padding: 0 0 1em;
  /* border-bottom: 1px solid var(--border-primary); */
`

const NextBlockList = styled.ul`
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
`

const NextBlockListItem = styled.li`
  margin: 0 -1em !important;
  padding: 0 1em;
  border-radius: 6px;

  &:not(:last-of-type) {
    /* border-bottom: 1px solid var(--border-primary); */
  }

  &:hover {
    background-color: var(--bg-secondary);
  }
`

const NextBlockListItemLink = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0;
  border-bottom: 0 !important;

  > svg {
    width: 1em;
  }

  &:hover {
    border-bottom: 0 !important;
  }
`

export default function NextBlock(props) {
  const { steps } = props

  return (
    <NextBlockContainer>
      <NextBlockHeading>Next Steps</NextBlockHeading>
      <NextBlockList>
        {steps.map((step) => {
          return (
            <NextBlockListItem>
              <NextBlockListItemLink href={step.link}>
                <span>{step.text}</span>
                <ArrowRightS />
              </NextBlockListItemLink>
            </NextBlockListItem>
          )
        })}
      </NextBlockList>
    </NextBlockContainer>
  )
}
