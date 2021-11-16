import React from 'react'
import meta from '../content/docs/meta.json'
import ActiveLink from './ActiveLink'
import Button from './Button'
import { useDarkMode } from 'next-dark-mode'

export default function Navigation() {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode()

  const toggleMode = () => {
    console.log(darkModeActive)
    if (darkModeActive) switchToLightMode()
    else switchToDarkMode()
  }

  const toc = meta

  function SidenavGroup({ categoryID, category, pages, clickHandler }) {
    return (
      <div className='mb-3'>
        <strong className='block mb-1'>{category}</strong>
        {pages.map((page, index) => {
          const href = `/${categoryID}/${page['route']}`

          return (
            <span key={index} className='block -ml-1.5'>
              <ActiveLink href={href} activeClassName='bg-secondary !text-primary font-medium'>
                <a className='px-1.5 rounded-sm block leading-loose py-0.5 text-secondary hover:text-primary hover:bg-secondary'>
                  {page['display']}
                </a>
              </ActiveLink>
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {toc.order.map((category, index) => {
        return (
          <SidenavGroup
            key={index}
            categoryID={category.id}
            category={category.name}
            pages={category.pages}
          ></SidenavGroup>
        )
      })}
      <Button size='small' variant='secondary' className='w-full' onClick={toggleMode}>
        {darkModeActive && <>Switch to light mode</>}
        {!darkModeActive && <>Switch to dark mode</>}
      </Button>
    </>
  )
}
