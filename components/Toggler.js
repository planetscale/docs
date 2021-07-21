import React, { useContext } from 'react'
import { styled } from '../stitches.config'
import { ThemeContext } from './themeContext'
import * as RadioGroup from '@radix-ui/react-radio-group'

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

export default function Toggler() {
  const themeContext = useContext(ThemeContext)

  const handleRadioItem = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <StyledRadioGroupRoot
      value={themeContext.getSelectedMode().name}
      onValueChange={themeContext.switchTheme}
    >
      {themeContext.availableThemes.map((theme) => {
        return (
          <StyledRadioItem value={theme.name} onCheckedChange={handleRadioItem}>
            <StyledIndicator />
            {theme.icon}
          </StyledRadioItem>
        )
      })}
    </StyledRadioGroupRoot>
  )
}
