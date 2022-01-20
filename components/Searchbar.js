import React, { useEffect } from 'react'

export default function SearchBar() {
  const searchInput = React.createRef()

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent)
  })

  function handleKeyDownEvent(e) {
    if (e.code === 'Escape' && searchInput.current) {
      searchInput.current.blur()
    }
  }

  return (
    <input
      type='search'
      className='w-full leading-[1.5rem] px-1.5 rounded ring-offset-0 border shadow-sm text-base py-sm focus-ring bg-secondary text-primary border-secondary'
      id='searchbox'
      ref={searchInput}
      placeholder={'Search documentation'}
    ></input>
  )
}
