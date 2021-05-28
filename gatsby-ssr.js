import React from 'react'
import { getCssString } from './src/components/styles/stitches.config'
import { IdProvider } from '@radix-ui/react-id'
import { ThemeProvider } from './src/components/styles/themeContext'

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
      key="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssString(),
      }}
    />,
  ])
}
