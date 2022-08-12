import React from 'react'

import { MDXRemote } from 'next-mdx-remote'

import FeedbackBlock from './FeedbackBlock'
import HeadingBlock from './HeadingBlock'
import { components } from './MDX'
import PageInfo from './PageInfo'

export default function MDXContent({ title, subtitle, banner, body, lastUpdatedOn, slug, className }) {
  return (
    <div className={`mdx-content ${className ? className : ''}`}>
      <HeadingBlock title={title} subtitle={subtitle} banner={banner} />
      <MDXRemote {...body} components={components} lazy />
      <FeedbackBlock />
      <PageInfo lastUpdatedOn={lastUpdatedOn} slug={slug}></PageInfo>
    </div>
  )
}
