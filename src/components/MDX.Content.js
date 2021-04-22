// libs
import React from 'react'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ContentBlock } from './Layout.Wrapper'

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

const MarkDownContainer = styled.div`
  h3 {
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 2.5em;
    margin-bottom: 0;
  }

  a {
    color: var(--text-blue);
    text-decoration: none;
    border-bottom: 1px solid var(--bg-primary);
    transition: border-bottom 0.25s ease;

    &:hover {
      border-bottom: 1px solid var(--text-blue);
    }
  }

  p {
    font-size: 1em;
    line-height: 1.75em;
  }

  ul,
  ol {
    white-space: normal;
    padding: 0 1em;
  }

  li {
    font-size: 1em;
    line-height: 1.75em;
    margin: 1em 0;
  }

  table {
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    margin-top: 2em;
    width: 100%;
    color: var(--foreground2);
    border-spacing: 0;
  }

  table th,
  table td {
    text-align: left;
    padding: 1em;
    border-bottom: 1px solid var(--border-primary);
  }

  table th {
    font-size: 14px;
    border-bottom: 2px solid var(--border-primary);
  }
`

export default function MDXContent({
  title,
  subtitle,
  banner,
  body,
  lastUpdatedOn,
  slug,
}) {
  return (
    <ContentBlock>
      <MarkDownContainer>
        <HeadingBlock title={title} subtitle={subtitle} banner={banner} />
        <MDXProvider
          components={{
            code: CodeBlock,
            inlineCode: InlineCodeBlock,
            img: ImageBlock,
            h2: AnchorLink,
            NextBlock,
            InfoBlock,
          }}
        >
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </MarkDownContainer>
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </ContentBlock>
  )
}
