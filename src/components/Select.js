import React from 'react'
import styled from 'styled-components'
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
  const { options, defaultSelected, callback } = props

  return (
    <SelectContainer>
      <CustomSelect
        onChange={(e) => callback(e.target.value)}
        value={defaultSelected}
      >
        {options.map((option) => {
          return <option value={option.name}>{option.label}</option>
        })}
      </CustomSelect>
      <ArrowDropDown />
    </SelectContainer>
  )
}
