import { TitleAndMetaTags } from '../../components/TitleAndMetaTags'
import Layout from '../../components/layout_v1'
import meta from '../../content/v1/meta.json'
import React from 'react'
import { styled } from '../../stitches.config'
import {
  PageContainer,
  ArticleBlock,
  ContentBlock,
} from '../../components/Layout.Wrapper'
import HeadingBlock from '../../components/HeadingBlock'
import Header from '../../components/HeaderV1'
import Footer from '../../components/Footer'
import Link from 'next/link'

const CategoryList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'auto',
  columnGap: '2em',
  rowGap: '2em',
  margin: '2em 0',

  '@phone': {
    display: 'block',
  },

  '@tablet': {
    display: 'block',
  },
})

const CategoryContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '2em',

  '@phone': {
    padding: '1em',
  },
})

const CategoryTitle = styled('div', {
  fontWeight: '600',
  fontSize: '1.563em',
})

const CategorySubTitle = styled('p', {
  margin: '1em 0 0',
})

const CategoryCard = styled('a', {
  backgroundColor: '$bgSecondary',
  color: '$textPrimary',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '1px solid $borderPrimary',
  borderRadius: '6px',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: '$bgSecondary',
  },

  '@phone': {
    marginBottom: '1em',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  '@tablet': {
    marginBottom: '1em',
  },
})

export default function Overview() {
  return (
    <Layout>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <PageContainer>
        <Header />
        <ContentBlock>
          <ArticleBlock overview>
            <HeadingBlock
              title="PlanetScale Overview"
              subtitle="PlanetScale is a MySQL compatible, serverless database platform powered by Vitess. Get started in seconds and scale indefinitely. Follow our tutorials to quickly learn the basics of creating and managing a database; or learn more about the concepts, like database branching, that make our platform unique."
            />
            <CategoryList>
              {meta.order.map((category, index) => {
                return (
                  <Category
                    key={index}
                    categoryID={category.id}
                    categoryName={category.name}
                    description={category.description}
                    pages={category.pages}
                  ></Category>
                )
              })}
            </CategoryList>
          </ArticleBlock>
        </ContentBlock>
        <Footer />
      </PageContainer>
    </Layout>
  )
}

function Category({ categoryID, categoryName, description, pages }) {
  return (
    <Link href={`/v1/${categoryID}/${pages[0]['route']}`} passHref>
      <CategoryCard className="active">
        <CategoryContent>
          <CategoryTitle>{categoryName}</CategoryTitle>
          <CategorySubTitle>{description}</CategorySubTitle>
        </CategoryContent>
      </CategoryCard>
    </Link>
  )
}
