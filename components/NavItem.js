import React from 'react'

import ActiveLink from './ActiveLink'

const NavItem = ({ index, href, label }) => {
  return (
    <span key={index} className='block -ml-1.5'>
      <ActiveLink href={href} activeClassName='bg-secondary !text-primary font-medium'>
        <a className='px-1.5 rounded-sm block leading-loose py-0.5 text-secondary hover:text-primary hover:bg-secondary'>
          {label}
        </a>
      </ActiveLink>
    </span>
  )
}

export default NavItem
