import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'

const SearchContainer = styled.div`
  position: relative;

  &:focus {
    background-color: orange;
  }
`

const SearchBoxLabel = styled.label``

const SearchBox = styled.input`
  border: 1px solid var(--border-action);
  font-size: 14px;
  border-radius: 6px;
  outline: 0;
  padding: 0.5em 1em;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  box-shadow: var(--tw-shadow);
  width: 200px;
  transition: width 100ms ease-out;

  &:focus {
    background-color: var(--bg-primary);
    border-color: var(--text-blue);
    width: 300px;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`

const KeyPressIndicator = styled(ButtonSecondary)`
  position: absolute;
  right: 4px;
  top: 4px;
  padding: 4px 12px;
  font-size: 12px;
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
`

export default function SearchBar() {
  const [isKeyPressIndicatorVisible, setKeyPressIndicatorState] = useState(true)
  const searchInput = React.createRef()

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent)
  })

  function handleKeyDownEvent(e) {
    if (e.code === 'Slash' && searchInput.current) {
      e.preventDefault()
      searchInput.current.focus()
      setKeyPressIndicatorState(false)
    } else if (e.code === 'Escape' && searchInput.current) {
      searchInput.current.blur()
      setKeyPressIndicatorState(true)
    }
  }

  function searchInputOnFocus() {
    setKeyPressIndicatorState(false)
  }

  function searchInputOnBlur() {
    setKeyPressIndicatorState(true)
  }

  return (
    <SearchContainer>
      <SearchBoxLabel htmlFor={'searchbox'}>
        <SearchBox
          id="searchbox"
          ref={searchInput}
          placeholder={'Search documentation'}
          onClick={searchInputOnFocus}
          onBlur={searchInputOnBlur}
        ></SearchBox>
      </SearchBoxLabel>
      {isKeyPressIndicatorVisible ? (
        <KeyPressIndicator>/</KeyPressIndicator>
      ) : (
        ''
      )}
    </SearchContainer>
  )
}
