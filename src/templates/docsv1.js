import React from 'react'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import MDXContent from '../components/MDX.Content'
import QuickNav from '../components/QuickNav'
import { ContentBlock, PageContainer } from '../components/Layout.Wrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LayoutV1 from '../components/layout_v1'

export default function DocsV1Page({ data }) {
  const { doc } = data

  if (doc) {
    const { frontmatter, body, fields, headings } = doc
    return (
      <LayoutV1>
        <TitleAndMetaTags
          title={frontmatter.title}
          description={frontmatter.subtitle ? frontmatter.subtitle : ''}
          banner={frontmatter.banner ? frontmatter.banner : ''}
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
      </LayoutV1>
    )
  }
}

export const pageQuery = graphql`
  query DocsV1Query($slug: String!) {
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
      headings(depth: h2) {
        value
      }
      body
    }
  }
`
