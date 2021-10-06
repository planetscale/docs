// libs
import React from 'react'

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
import Link from 'next/link'

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
    a: Link,
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
    <div className="mdx-content">
      <HeadingBlock title={title} subtitle={subtitle} banner={banner} />
      <MDXRemote {...body} components={components} lazy />
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </div>
  )
}
