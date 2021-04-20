import React from 'react'
import { IdProvider } from '@radix-ui/react-id'
import { ThemeProvider } from './src/components/styles/themeContext'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <IdProvider>{element}</IdProvider>
    </ThemeProvider>
  )
}
