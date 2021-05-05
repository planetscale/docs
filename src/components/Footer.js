import React, { useContext } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { ThemeContext } from './styles/themeContext'
import Select from './Select'

const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      var(--border-primary),
      var(--bg-primary)
    );
  }

  ${media.phone`
    padding: 2em;
    border-top: 1px solid var(--border-primary);

    &:after {
      content: unset;
    }
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
`

const Copyright = styled.span`
  font-size: 12px;
  color: var(--text-secondary);
`

export default function Footer() {
  const themeContext = useContext(ThemeContext)

  return (
    <FooterWrapper>
      <FooterConstrain>
        <Copyright>© 2021 PlanetScale Inc.</Copyright>
        <Select
          options={themeContext.availableThemes}
          defaultSelected={themeContext.getSelectedMode().name}
          callback={themeContext.switchTheme}
        ></Select>
      </FooterConstrain>
    </FooterWrapper>
  )
}
