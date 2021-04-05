import React from 'react'
import {
  PageContainer,
  ContentPanel,
  ContentConstrain,
  ContentContainer,
} from './Layout.Wrapper'
import DocsNavigation from './Navigation'
import Header from './Header'
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
