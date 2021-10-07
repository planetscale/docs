import React, { useEffect, useState } from 'react'

export default function SearchBar() {
  const searchInput = React.createRef()

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent)
  })

  function handleClickEvent(e) {
    searchInput.current.focus()
  }

  function handleKeyDownEvent(e) {
    if (e.code === 'Escape' && searchInput.current) {
      searchInput.current.blur()
    }
  }

  return (
    <input
      type="search"
      className="w-full md:w-56 lg:w-96 leading-[1.5rem] px-1.5 rounded ring-offset-0 border shadow-sm mr-2 text-base py-sm focus-ring bg-secondary text-primary border-secondary"
      id="searchbox"
      ref={searchInput}
      placeholder={'Search documentation'}
    ></input>
  )
}
