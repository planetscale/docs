import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import Select from './Select'

const FooterWrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--border-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 64px;

  ${media.phone`
    padding: 24px;
  `};
`

const FooterConstrain = styled.div`
  position: sticky;
  top: 0;
  max-width: 80rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${media.phone`
    flex-direction: column;
    align-items: flex-start;
  `}
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.phone`
    margin-bottom: 1em;
  `}
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);

  > :first-child {
    margin-right: 1em;
  }
`

export default function Footer() {
  const themeOptions = [
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ]

  return (
    <FooterWrapper>
      <FooterConstrain>
        <LeftContainer>
          <span>© 2021 PlanetScale Inc.</span>
        </LeftContainer>
        <RightContainer>
          <Select options={themeOptions}></Select>
        </RightContainer>
      </FooterConstrain>
    </FooterWrapper>
  )
}
