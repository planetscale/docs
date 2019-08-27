import '../utils/IE11Pollyfill'

import React from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'

import Header from '../components/Layout.Header'

import { theme, headerLinks } from '../site'
import { GlobalStyles } from '../styles/globals'

const Layout = (props) => {
  const { children } = props

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <Header pages={headerLinks} />
          {children}
          <GlobalStyles />
        </>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
