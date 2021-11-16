import React from 'react'
import meta from '../content/docs/meta.json'
import ActiveLink from './ActiveLink'
import LabelSelect from './LabelSelect'
import { useDarkMode } from 'next-dark-mode'

export default function Navigation() {
  const { lightModeActive, autoModeActive, switchToAutoMode, switchToDarkMode, switchToLightMode } = useDarkMode()

  let theme = 'dark'
  if (autoModeActive) {
    theme = 'auto'
  }
  if (lightModeActive) {
    theme = 'light'
  }
  console.log(theme)

  const switchMode = (event) => {
    switch (event.target.value) {
      case 'auto':
        switchToAutoMode()
        break
      case 'dark':
        switchToDarkMode()
        break
      case 'light':
        switchToLightMode()
        break
    }
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
      <LabelSelect label='Theme' defaultValue={theme} size='small' className='inline-flex' onChange={switchMode}>
        <option value='dark'>Dark</option>
        <option value='light'>Light</option>
        <option value='auto'>System</option>
      </LabelSelect>
    </>
  )
}
