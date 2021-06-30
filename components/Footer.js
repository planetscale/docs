import React, { useContext } from 'react'
import { styled } from '../stitches.config'
import { ThemeContext } from './themeContext'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Settings, Moon, Sun } from '@styled-icons/remix-line'

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
    background: 'linear-gradient(to right, $borderPrimary, $bgPrimary)',
  },

  '@phone': {
    padding: '2em',
    borderTop: '1px solid $borderPrimary',

    '&:after': {
      content: 'unset',
    },
  },
})

const FooterConstrain = styled('div', {
  maxWidth: '80rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '> a': {
    marginRight: '8px',
  },
})

const LinkBlock = styled('a', {
  fontSize: '12px',
  color: '$textBlue',
  textDecoration: 'none',
  borderBottom: '1px solid $bgPrimary',
  transition: 'border-bottom 0.25s ease',

  '&:hover': {
    borderBottom: '1px solid $textBlue',
  },
})

const Copyright = styled('div', {
  fontSize: '12px',
  color: '$textSecondary',
})

const StyledRadioGroupRoot = styled(RadioGroup.Root, {
  border: '1px solid $borderPrimary',
  borderRadius: '6px',

  '*:first-child': {
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
  },

  '*:last-child': {
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  },
})

const StyledRadioItem = styled(RadioGroup.Item, {
  appearance: 'none',
  backgroundColor: 'unset',
  border: 'none',
  padding: '8px',
  margin: '0',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  outline: '0',
  color: '$textPrimary',

  svg: {
    width: '1em',
    height: '1em',
    transition: 'transform 250ms ease',
  },

  '& ~ &': {
    borderLeft: '1px solid $borderPrimary',
  },

  '&:hover': {
    backgroundColor: '$bgSecondary',

    svg: {
      transform: 'translateY(-5%)',
    },
  },
})

const StyledIndicator = styled(RadioGroup.Indicator, {
  position: 'absolute',
  width: '100%',
  height: '100%',

  '& + svg': {
    color: '$textBlue',
  },
})

export default function Footer() {
  const themeContext = useContext(ThemeContext)

  const handleRadioItem = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <FooterWrapper>
      <FooterConstrain>
        <LeftContainer>
          <LinkBlock href="https://www.planetscale.com/legal/privacy">
            Privacy
          </LinkBlock>
          <LinkBlock href="https://www.planetscale.com/legal/siteterms">
            Terms
          </LinkBlock>
          <Copyright>© 2021 PlanetScale Inc.</Copyright>
        </LeftContainer>
        <StyledRadioGroupRoot
          value={themeContext.getSelectedMode().name}
          onValueChange={themeContext.switchTheme}
        >
          <StyledRadioItem value="system" onCheckedChange={handleRadioItem}>
            <StyledIndicator />
            <Settings />
          </StyledRadioItem>
          <StyledRadioItem value="light" onCheckedChange={handleRadioItem}>
            <StyledIndicator />
            <Sun />
          </StyledRadioItem>
          <StyledRadioItem value="dark" onCheckedChange={handleRadioItem}>
            <StyledIndicator />
            <Moon />
          </StyledRadioItem>
        </StyledRadioGroupRoot>
      </FooterConstrain>
    </FooterWrapper>
  )
}
