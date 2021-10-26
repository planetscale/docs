import React, { useEffect, useState } from 'react'
import SearchBar from './Searchbar'
import Cookies from 'js-cookie'
import Logo from './Logo'
import ButtonLink from './ButtonLink'
import Link from 'next/link'
import HamburgerMenu from './HamburgerMenu'
import Navigation from './Navigation'
import classNames from 'classnames'

export default function Header() {
  const [isSignedIn, setSignedInState] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)

  function toggleMobileNav() {
    setShowMobileNav((s) => !s)
  }

  useEffect(() => {
    if (typeof Cookies.get('signed_in') !== 'undefined') {
      setSignedInState(true)
    }
  })

  return (
    <>
      <a
        href='#content'
        className='absolute z-50 px-2 py-1 border-b border-r rounded-br -ml-96 focus:ml-0 bg-secondary'
      >
        Skip to content
      </a>
      <div className='relative z-40 w-full py-3 mx-auto border-b bg-primary text-primary'>
        {/* Overlay */}
        <div
          className={classNames('md:hidden duration-300 fixed z-30 inset-0 transition-opacity', {
            'opacity-0 pointer-events-none': !showMobileNav,
            'opacity-100 pointer-events-auto': showMobileNav
          })}
          aria-hidden='true'
        >
          <div className='absolute inset-0 bg-primary'></div>
        </div>

        <header className='relative z-50 grid items-center grid-cols-2 px-3 mx-auto md:grid-cols-3 md:grid-rows-1 max-w-7xl sm:px-6 lg:px-8'>
          <div className='flex items-center col-start-1 row-start-1'>
            <Link href='/'>
              <a className='rounded text-primary' aria-label='Go to documentation homepage'>
                <Logo />
              </a>
            </Link>
            <div className='flex items-center lg:text-lg font-medium pl-1.5'>
              <Link href='/'>
                <a className='text-primary'>Documentation</a>
              </Link>
              <span className='flex items-center h-2.5 px-1 ml-1 font-mono text-sm font-bold leading-none text-white rounded-full py-sm bg-gradient-purple'>
                Beta
              </span>
            </div>
          </div>

          <div
            className={classNames(
              'col-start-1 col-span-2 md:col-span-1 pt-3 md:pt-0 row-start-3 md:col-start-2 md:row-start-1 md:flex',
              {
                hidden: !showMobileNav
              }
            )}
          >
            <SearchBar />
          </div>
          <div
            className={classNames(
              'col-start-1 col-span-2 md:col-span-1 row-start-2 pt-5 md:pt-0 md:row-start-1 md:col-start-3 md:justify-end md:flex',
              {
                hidden: !showMobileNav
              }
            )}
          >
            <ButtonLink href='https://auth.planetscale.com/sign-up' variant='secondary' className='mr-2'>
              Get started
            </ButtonLink>
            <ButtonLink href='https://app.planetscale.com/' variant='secondary'>
              {isSignedIn ? 'Go to dashboard' : 'Sign in'}
            </ButtonLink>
          </div>
          <div className='relative z-50 flex justify-end col-start-2 row-start-1 align-center md:hidden'>
            <button
              aria-label='Open navigation menu'
              className='flex appearance-none focus:outline-none'
              onClick={toggleMobileNav}
            >
              <HamburgerMenu open={showMobileNav} />
            </button>
          </div>
        </header>
        <div
          className={classNames('relative z-40 w-full px-3 pt-3 sm:px-6 lg:px-8 sm:w-1/2 md:hidden', {
            hidden: !showMobileNav
          })}
        >
          <Navigation />
        </div>
      </div>
    </>
  )
}
