import React, { Component } from 'react'
import { styled } from '../components/styles/stitches.config'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import HeadingBlock from '../components/HeadingBlock'
import {
  PageContainer,
  ContentBlock,
  ArticleBlock,
} from '../components/Layout.Wrapper'
import { ButtonSecondary } from '../components/Buttons'
import { Github } from '@styled-icons/remix-line'
import Layout from '../components/layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  margin: '0 0 4em',
})

class NotFoundPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <TitleAndMetaTags
          title="Page Not Found"
          pathname="404"
        ></TitleAndMetaTags>
        <PageContainer>
          <Header />
          <ContentBlock>
            <ArticleBlock>
              <HeadingBlock
                title="404: Page not found"
                subtitle="This page does not exist."
              />
              <ButtonContainer>
                <ButtonSecondary
                  as="a"
                  href="https://github.com/planetscale/docs.public"
                >
                  <Github />
                  <span>Visit @planetscale/docs.public</span>
                </ButtonSecondary>
              </ButtonContainer>
            </ArticleBlock>
          </ContentBlock>
          <Footer />
        </PageContainer>
      </Layout>
    )
  }
}

export default NotFoundPage
