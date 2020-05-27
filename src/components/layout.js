import '../utils/IE11Pollyfill'
import React, { Fragment } from 'react'
import { GlobalStyles } from '../styles/globals'
import { PageContainer, ContentContainer } from '../components/Layout.Wrapper'
import DocsNavigation from '../components/Docs.Navigation'

export default ({ children }) => (
  <Fragment>
    <PageContainer>
      <DocsNavigation></DocsNavigation>
      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
    <GlobalStyles />
  </Fragment>
)
