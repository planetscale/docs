import React from 'react'
import DocsOverview from '../components/Docs.Overview'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import { ThemeProvider } from '../components/styles/themeContext'

export default function Home() {
  return (
    <ThemeProvider>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsOverview />
    </ThemeProvider>
  )
}
