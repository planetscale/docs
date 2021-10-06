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
      <div className='relative z-40 py-3 border-b bg-primary text-primary mx-auto w-full'>
        <div
          className={classNames('md:hidden duration-300 fixed z-30 inset-0 transition-opacity', {
            'opacity-0 pointer-events-none': !showMobileNav,
            'opacity-100 pointer-events-auto': showMobileNav
          })}
          aria-hidden='true'
        >
          <div className='absolute inset-0 bg-primary'></div>
        </div>
        <div
          className={classNames('w-full absolute px-3 sm:px-6 z-50 top-12 duration-300 transition-opacity', {
            'opacity-0 pointer-events-none': !showMobileNav,
            'opacity-100 pointer-events-auto': showMobileNav
          })}
        >
          <div className='flex md:hidden flex-col sm:flex-row-reverse sm:items-center justify-between mb-4'>
            <span className='mb-3 sm:mb-0'>
              <ButtonLink href='https://auth.planetscale.com/sign-up' variant='secondary' className='mr-2 sm:mr-1'>
                Get started
              </ButtonLink>
              <ButtonLink href='https://app.planetscale.com/' variant='secondary'>
                {isSignedIn ? 'Go to dashboard' : 'Sign in'}
              </ButtonLink>
            </span>
            <span className='flex-1 sm:mr-4 '>
              <SearchBar />
            </span>
          </div>
          <div className='w-full sm:w-1/2 md:hidden'>
            <Navigation />
          </div>
        </div>
        <header className='z-50 relative flex items-center justify-between max-w-7xl px-3 sm:px-6 lg:px-8 mx-auto'>
          <div className='flex items-center w-2/5 md:w-1/3 pr-4'>
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

          <div className='flex-grow justify-between items-center flex-none hidden md:flex'>
            <SearchBar />
            <span>
              <ButtonLink href='https://auth.planetscale.com/sign-up' variant='secondary' className='mr-2'>
                Get started
              </ButtonLink>
              <ButtonLink href='https://app.planetscale.com/' variant='secondary'>
                {isSignedIn ? 'Go to dashboard' : 'Sign in'}
              </ButtonLink>
            </span>
          </div>
          <button
            aria-label='Open navigation menu'
            className='relative z-50 flex appearance-none focus:outline-none md:hidden'
            onClick={toggleMobileNav}
          >
            <HamburgerMenu open={showMobileNav} />
          </button>
        </header>
      </div>
    </>
  )
}
