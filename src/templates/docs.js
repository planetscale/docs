import React from 'react'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import MDXContent from '../components/MDX.Content'
import QuickNav from '../components/QuickNav'
import { ContentBlock, PageContainer } from '../components/Layout.Wrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/layout'

export default function DocsPage({ data }) {
  const { doc } = data

  if (doc) {
    const { frontmatter, body, fields, headings } = doc
    return (
      <Layout>
        <TitleAndMetaTags
          title={frontmatter.title}
          description={frontmatter.subtitle ? frontmatter.subtitle : ''}
          banner={
            frontmatter.banner
              ? frontmatter.banner
              : '/img/internals/social_share.png'
          }
          pathname={`${fields.slug}`}
        />
        <PageContainer>
          <Header />
          <ContentBlock>
            <MDXContent
              title={frontmatter.title}
              subtitle={frontmatter.subtitle ? frontmatter.subtitle : ''}
              banner={frontmatter.banner ? frontmatter.banner : ''}
              body={body}
              lastUpdatedOn={fields.lastUpdatedOn}
              slug={fields.slug}
            ></MDXContent>
            <QuickNav subNavPages={headings}></QuickNav>
          </ContentBlock>
          <Footer />
        </PageContainer>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: mdx(
      fields: { slug: { eq: $slug } }
      frontmatter: { title: { ne: "" } }
    ) {
      fields {
        lastUpdatedOn
        slug
      }
      frontmatter {
        title
        subtitle
        banner
      }
      headings {
        depth
        value
      }
      body
    }
  }
`
