import React from 'react'

import { useTheme } from 'next-themes'

import meta from '../content/docs/meta.json'
import LabelSelect from './LabelSelect'
import NavItem from './NavItem'
import SubNavSection from './SubNavSection'

export default function Navigation() {
  const { theme, setTheme } = useTheme()

  const switchMode = (event) => {
    setTheme(event.target.value)
  }

  const toc = meta

  function SidenavGroup({ categoryID, category, pages }) {
    return (
      <div className='mb-3'>
        <strong className='block mb-1'>{category}</strong>
        {pages.map((page, index) => {
          if (page['subpages']) {
            return <SubNavSection page={page} subpages={page['subpages']} categoryID={categoryID} key={index} />
          } else {
            return (
              <NavItem index={index} href={`/${categoryID}/${page['route']}`} label={page['display']} key={index} />
            )
          }
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
      <LabelSelect label='Theme' value={theme} size='small' className='inline-flex' onChange={switchMode}>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
        <option value='system'>System</option>
      </LabelSelect>
    </>
  )
}
