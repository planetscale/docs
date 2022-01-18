import React, { useState } from 'react'

import classNames from 'classnames'

import NavItem from './NavItem'

const SubNavSection = ({ page, subpages, categoryID }) => {
  const [showSubNav, setShowSubNav] = useState(false)

  function toggleSubNav() {
    setShowSubNav((s) => !s)
  }

  return (
    <div className='-ml-3 pl-1.5'>
      <button
        className='flex align-start px-1.5 rounded-sm w-full leading-loose py-0.5 text-secondary hover:text-primary hover:bg-secondary'
        onClick={toggleSubNav}
      >
        {page['display']}
      </button>
      <div
        className={classNames('ml-2 pl-2 border-l', {
          block: showSubNav,
          hidden: !showSubNav
        })}
      >
        {subpages.map((page, index) => {
          return <NavItem key={index} index={index} href={`/${categoryID}/${page['route']}`} label={page['display']} />
        })}
      </div>
    </div>
  )
}

export default SubNavSection
