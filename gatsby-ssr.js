import React from 'react'
import { IdProvider } from '@radix-ui/react-id'
import { ThemeProvider } from './src/components/styles/themeContext'
import { getCssString } from './src/components/styles/stitches.config'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <IdProvider>{element}</IdProvider>
    </ThemeProvider>
  )
}

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssString(),
      }}
    />,
  ])
}
