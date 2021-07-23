import React from 'react'
import { styled } from '../stitches.config'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import HeadingBlock from '../components/HeadingBlock'
import {
  PageContainer,
  ContentBlock,
  ArticleBlock,
} from '../components/Layout.Wrapper'
import { ButtonSecondary } from '../components/Buttons'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Layout from '../components/layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  margin: '0 0 4em',
})

export default function NotFoundPage() {
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
                href="https://github.com/planetscale/docs"
              >
                <GitHubLogoIcon />
                <span>Visit @planetscale/docs</span>
              </ButtonSecondary>
            </ButtonContainer>
          </ArticleBlock>
        </ContentBlock>
        <Footer />
      </PageContainer>
    </Layout>
  )
}
