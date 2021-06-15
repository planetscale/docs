import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import Layout from '../components/layout'
import meta from '../content/docs/meta.json'
import React, { useEffect, useState, useContext } from 'react'
import { styled } from '../stitches.config'
import {
  PageContainer,
  ArticleBlock,
  ContentBlock,
} from '../components/Layout.Wrapper'
import HeadingBlock from '../components/HeadingBlock'
import { ButtonSecondary } from '../components/Buttons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeContext } from '../components/themeContext'

const CalloutCardList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'auto',
  columnGap: '2em',
  rowGap: '2em',
  margin: '0 0 1em',

  '@phone': {
    gridTemplateColumns: 'repeat(1, 1fr)',
    margin: '2em 0',
  },
})

const CalloutCard = styled('div', {
  border: '1px solid var(--text-primary)',
  borderRadius: '6px',
  padding: '2em',
  background: 'url(/img/internals/get_started.png) var(--text-primary)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right',
  color: 'var(--bg-primary)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  boxShadow: '0 0 16px -64px var(--black)',
})

const CalloutCardHeading = styled('h2', {
  fontSize: '1.75em',
  margin: '0 0 0.5em',
  padding: '0',
})

const CalloutCardSubheading = styled('p', {
  fontSize: '1em',
  lineHeight: '1.5em',
  margin: '0 0 1.5em',
  padding: '0',
  maxWidth: '50ch',
})

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

const CategoryImageContainer = styled('div', {
  '@phone': {
    paddingBottom: '0.5em',
    borderBottom: '1px solid var(--border-primary)',
  },
})

const CategoryImage = styled('img', {
  maxWidth: '130px',
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
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '1px solid var(--border-primary)',
  borderRadius: '6px',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: 'var(--bg-secondary)',
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
            <CalloutCardList>
              <CalloutCard>
                <CalloutCardHeading>Get started</CalloutCardHeading>
                <CalloutCardSubheading>
                  To interact with PlanetScale and manage your databases, you
                  can set up your development environment and install the pscale
                  CLI.
                </CalloutCardSubheading>
                <ButtonSecondary
                  as="a"
                  href="/reference/planetscale-environment-setup"
                >
                  Get Started
                </ButtonSecondary>
              </CalloutCard>
            </CalloutCardList>
            <CategoryList>
              {meta.order.map((category, index) => {
                return (
                  <Category
                    key={index}
                    categoryID={category.id}
                    categoryName={category.name}
                    description={category.description}
                    image={category.image}
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

function Category({ categoryID, categoryName, description, image, pages }) {
  const themeContext = useContext(ThemeContext)
  const [imageURL, setImageURL] = useState(image)

  useEffect(() => {
    const activeThemeSuffix = themeContext.getActiveMode().name
    if (image.split('_light').length > 1) {
      setImageURL(image.split('_light').join(`_${activeThemeSuffix}`))
    }
  }, [themeContext])

  return (
    <CategoryCard
      href={`${categoryID}/${pages[0]['route']}`}
      className="active"
    >
      <CategoryImageContainer>
        <CategoryImage src={imageURL}></CategoryImage>
      </CategoryImageContainer>
      <CategoryContent>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <CategorySubTitle>{description}</CategorySubTitle>
      </CategoryContent>
    </CategoryCard>
  )
}
