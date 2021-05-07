import React, { useContext } from 'react'
import { styled } from './styles/stitches.config'
import { ThemeContext } from './styles/themeContext'
import Select from './Select'

const FooterWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0',

  '&:after': {
    position: 'absolute',
    top: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background:
      'linear-gradient(to right, var(--border-primary), var(--bg-primary))',
  },

  '@phone': {
    padding: '2em',
    borderTop: '1px solid var(--border-primary)',

    '&:after': {
      content: 'unset',
    },
  },
})

const FooterConstrain = styled('div', {
  position: 'sticky',
  top: '0',
  maxWidth: '80rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Copyright = styled('span', {
  fontSize: '12px',
  color: 'var(--text-secondary)',
})

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
