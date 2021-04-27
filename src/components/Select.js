import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from './styles/themeContext'
import { ArrowDropDown } from '@styled-icons/remix-line'

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  padding: 0.25em 0.5em 0.25em 1em;

  > svg {
    width: 24px;
  }
`

const CustomSelect = styled.select`
  appearance: none;
  background: unset;
  border: unset;
  font-size: 12px;
  color: var(--text-primary);

  &:focus {
    outline: unset;
  }
`

export default function Select(props) {
  const themeContext = useContext(ThemeContext)
  const { options } = props

  const changeTheme = (event) => {
    const inputSelectedThemeName = event.target.value

    if (inputSelectedThemeName === 'dark') {
      themeContext.switchTheme('dark')
    } else if (inputSelectedThemeName === 'light') {
      themeContext.switchTheme('light')
    } else {
      themeContext.switchTheme('system')
    }
  }

  return (
    <SelectContainer>
      <CustomSelect onChange={changeTheme}>
        {options.map((option) => {
          return (
            <option
              value={option.value}
              selected={
                themeContext.selectedTheme.name === option.value ? 'true' : ''
              }
            >
              {option.label}
            </option>
          )
        })}
      </CustomSelect>
      <ArrowDropDown />
    </SelectContainer>
  )
}
