import '../utils/IE11Pollyfill'

import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'

import Header from '../components/Layout.Header'

import { theme, headerLinks } from '../site'
import { GlobalFonts } from '../fonts'
import { GlobalStyles } from '../styles/globals'

const Layout = (props) => {
  const { children } = props

  return (
    <>
      <Helmet>
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <>
          <Header pages={headerLinks} />
          {children}
          <GlobalFonts />
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
