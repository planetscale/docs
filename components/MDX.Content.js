import React from 'react'

import { MDXRemote } from 'next-mdx-remote'

import FeedbackBlock from './FeedbackBlock'
import GetHelp from './GetHelp'
import HeadingBlock from './HeadingBlock'
import AnchorLink from './MDX.AnchorLink'
import CodeBlock from './MDX.CodeBlock'
import ImageBlock from './MDX.ImageBlock'
import InfoBlock from './MDX.InfoBlock'
import InlineCodeBlock from './MDX.InlineCodeBlock'
import NextBlock from './MDX.NextBlock'
import TableBlock from './MDX.TableBlock'
import VideoBlock from './MDX.VideoBlock'
import PageInfo from './PageInfo'

export default function MDXContent({ title, subtitle, banner, body, lastUpdatedOn, slug, category, className }) {
  const components = {
    table: TableBlock,
    pre: CodeBlock,
    code: InlineCodeBlock,
    img: ImageBlock,
    h2: (props) => <AnchorLink {...props} heading='h2' category={category} />,
    h3: (props) => <AnchorLink {...props} heading='h3' category={category} />,
    NextBlock,
    InfoBlock,
    ImageBlock,
    VideoBlock,
    GetHelp
  }

  return (
    <div className={`mdx-content ${className ? className : ''}`}>
      <HeadingBlock title={title} subtitle={subtitle} banner={banner} />
      <MDXRemote {...body} components={components} lazy />
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </div>
  )
}
