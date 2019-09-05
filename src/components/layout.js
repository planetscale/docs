import '../utils/IE11Pollyfill'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../site'
import { GlobalStyles } from '../styles/globals'

export default ({ children }) => (
  <>
    <ThemeProvider theme={theme}>
      <>
        {children}
        <GlobalStyles />
      </>
    </ThemeProvider>
  </>
)
