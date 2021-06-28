import React, { useEffect, useState } from 'react'
import { styled } from '../stitches.config'
import { ButtonSecondary } from './Buttons'

const SearchContainer = styled('div', {
  position: 'relative',
  width: '330px',
})

const SearchBoxLabel = styled('label', {})

const SearchBox = styled('input', {
  border: '1px solid $borderPrimary',
  fontSize: '14px',
  borderRadius: '6px',
  outline: '0',
  padding: '0.5em 1em',
  color: '$textPrimary',
  backgroundColor: '$bgPrimary',
  width: '330px',
  transition: 'width 100ms ease-out',

  '&:focus': {
    backgroundColor: '$bgPrimary',
    borderColor: '$textBlue',
    width: '420px',
  },

  '&::placeholder': {
    color: '$textSecondary',
  },
})

const KeyPressIndicatorWrapper = styled('div', {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  paddingRight: '4px',
})

const KeyPressIndicator = styled(ButtonSecondary, {
  padding: '4px 8px',
  fontSize: '12px',
  color: '$textSecondary',
  backgroundColor: 'unset',
  border: 'unset',
})

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
