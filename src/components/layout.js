import React, { Fragment } from 'react'
import {
  PageContainer,
  ContentPanel,
  ContentContainer,
} from '../components/Layout.Wrapper'
import DocsNavigation from '../components/Docs.Navigation'
import Header from './Docs.Header'
import Footer from './Footer'
import './layout.css'

export default ({ children }) => (
  <Fragment>
    <PageContainer>
      <Header></Header>
      <ContentPanel>
        <DocsNavigation></DocsNavigation>
        <ContentContainer>{children}</ContentContainer>
      </ContentPanel>
      <Footer></Footer>
    </PageContainer>
  </Fragment>
)
