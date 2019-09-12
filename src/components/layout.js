import '../utils/IE11Pollyfill'
import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../site'
import { GlobalStyles } from '../styles/globals'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {children}
      <GlobalStyles />
    </Fragment>
  </ThemeProvider>
)
