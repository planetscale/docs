// libs
import React from 'react'
import { styled } from '../stitches.config'
import { ArticleBlock } from './Layout.Wrapper'

import { MDXRemote } from 'next-mdx-remote'

// non MDX blocks
import HeadingBlock from './HeadingBlock'
import FeedbackBlock from './FeedbackBlock'
import PageInfo from './PageInfo'

// MDX blocks
import CodeBlock from './MDX.CodeBlock'
import InlineCodeBlock from './MDX.InlineCodeBlock'
import AnchorLink from './MDX.AnchorLink'
import ImageBlock from './MDX.ImageBlock'
import NextBlock from './MDX.NextBlock'
import InfoBlock from './MDX.InfoBlock'
import TableBlock from './MDX.TableBlock'

const MarkDownContainer = styled('div', {
  color: '$textPrimary',

  '& h2:first-of-type': {
    marginTop: '1em',
  },

  '& h3': {
    fontWeight: '600',
    fontSize: '1.25em',
    marginTop: '2em',
    marginBottom: '0',
  },

  '& a': {
    color: '$textBlue',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'border-bottom 0.25s ease',

    '&:hover': {
      borderBottom: '1px solid $textBlue',
    },

    '&.embed': {
      borderBottom: 'unset !important',
    },
  },

  '& p': {
    fontSize: '1em',
    lineHeight: '1.75em',
  },

  '& ul, ol': {
    whitespace: 'normal',
    padding: '0 1em 0 1.1em',
    margin: '0 0 1em',
  },

  '& ol > li': {
    fontSize: '1em',
    lineHeight: '1.75em',
    margin: '1em 0.5em',
  },

  '& ul > li': {
    fontSize: '1em',
    lineHeight: '1.75em',
    margin: '1em 0',
  },
})

export default function MDXContent({
  title,
  subtitle,
  banner,
  body,
  lastUpdatedOn,
  slug,
  category,
}) {
  const components = {
    table: TableBlock,
    code: CodeBlock,
    inlineCode: InlineCodeBlock,
    img: ImageBlock,
    h2: (props) => <AnchorLink {...props} heading="h2" category={category} />,
    h3: (props) => <AnchorLink {...props} heading="h3" category={category} />,
    NextBlock,
    InfoBlock,
  }

  return (
    <ArticleBlock>
      <MarkDownContainer>
        <HeadingBlock title={title} subtitle={subtitle} banner={banner} />
        <MDXRemote {...body} components={components} lazy />
      </MarkDownContainer>
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </ArticleBlock>
  )
}
