import React, { Fragment } from 'react'
import {
  PageContainer,
  ContentPanel,
  ContentContainer,
} from '../components/Layout.Wrapper'
import DocsNavigation from '../components/Docs.Navigation'
import Header from './Docs.Header'
import './layout.css'

export default ({ children }) => (
  <Fragment>
    <PageContainer>
      <DocsNavigation></DocsNavigation>
      <ContentPanel>
        <Header></Header>
        <ContentContainer>{children}</ContentContainer>
      </ContentPanel>
    </PageContainer>
  </Fragment>
)
