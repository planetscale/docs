import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'

const SearchContainer = styled.div`
  position: relative;
  width: 230px;

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
  width: 230px;
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

const KeyPressIndicatorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 4px;
`

const KeyPressIndicator = styled(ButtonSecondary)`
  padding: 4px 10px;
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

  function handleClickEvent(e) {
    searchInput.current.focus()
    setKeyPressIndicatorState(false)
  }

  function handleKeyDownEvent(e) {
    if (e.code === 'Slash' && e.metaKey && searchInput.current) {
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
        <KeyPressIndicatorWrapper onClick={handleClickEvent}>
          <KeyPressIndicator>⌘ /</KeyPressIndicator>
        </KeyPressIndicatorWrapper>
      ) : (
        ''
      )}
    </SearchContainer>
  )
}
