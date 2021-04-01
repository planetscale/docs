import React from 'react'
import {
  PageContainer,
  ContentPanel,
  ContentConstrain,
  ContentContainer,
} from './Layout.Wrapper'
import DocsNavigation from './Docs.Navigation'
import Header from './Docs.Header'
import Footer from './Footer'
import './layout.css'

export default ({ children }) => (
  <PageContainer>
    <Header></Header>
    <ContentPanel>
      <ContentContainer>
        <DocsNavigation></DocsNavigation>
        {children}
      </ContentContainer>
    </ContentPanel>
    <Footer></Footer>
  </PageContainer>
)
