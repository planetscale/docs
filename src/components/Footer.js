import React from 'react'
import styled from 'styled-components'
import { media } from './styles/media'

const FooterWrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--border-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0 64px;

  ${media.phone`
    padding: 0 24px;
  `};
`

const FooterConstrain = styled.div`
  position: sticky;
  top: 0;
  max-width: 80rem;
  width: 100%;
  height: 86px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const RightContainer = styled.div`
  font-size: 14px;
  color: var(--text);
`

const HomeLink = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: stretch;
  margin-right: 2em;
`

const Logo = styled.div`
  height: 24px;
  width: 16rem;
  background: var(--logoCompany);
  background-size: contain;
  background-repeat: no-repeat;

  ${media.phone`
    height: 24px;
  `};
`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterConstrain>
        <LeftContainer>
          <HomeLink href="/">
            <Logo />
          </HomeLink>
        </LeftContainer>
        <RightContainer>
          Copyright © 2021 PlanetScale Inc. All rights reserved.
        </RightContainer>
      </FooterConstrain>
    </FooterWrapper>
  )
}
