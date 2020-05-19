import '../utils/IE11Pollyfill'
import React, { Fragment } from 'react'
import { GlobalStyles } from '../styles/globals'
import { PageContainer, MaxWidthBoundary } from '../components/Layout.Wrapper'
import DocsNavigation from '../components/Docs.Navigation'

export default ({ children }) => (
  <Fragment>
    <PageContainer>
      <MaxWidthBoundary>
        <DocsNavigation></DocsNavigation>
        {children}
      </MaxWidthBoundary>
    </PageContainer>
    <GlobalStyles />
  </Fragment>
)
