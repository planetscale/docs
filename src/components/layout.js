import React, { Fragment } from 'react'
import {
  PageContainer,
  ContentPanel,
  ContentConstrain,
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
        <ContentConstrain>
          <DocsNavigation></DocsNavigation>
          <ContentContainer>{children}</ContentContainer>
        </ContentConstrain>
      </ContentPanel>
      <Footer></Footer>
    </PageContainer>
  </Fragment>
)
