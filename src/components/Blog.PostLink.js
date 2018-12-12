import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Button } from './Common.Button'
import { H2 } from './Typography.Headings'

import { media } from '../styles/media'

import background from '../images/hero/blog-bg.svg'

const _BlogPostLink = styled.article`
  margin: 0 5em 5em 5em;

  ${media.largePhone`
     margin: 0 2em 5em 2em;
  `};
`

const Description = styled.p`
  font-size: 1.5em;
  font-weight: 100;
  margin: 0;
  padding: 1em 0;
`

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.5em;
  font-weight: 100;
  margin: 0;

  ${media.largePhone`
    flex-direction: column;
  `};
`

const ByAt = styled.h2`
  font-size: 0.75em;
  font-weight: 300;
  margin: 0 1em;

  ${media.largePhone`
    order: -1;
    margin: 1em 0;
  `};
`

export function BlogPostLink({ title, description, date, author, slug }) {
  return (
    <Link to={`/news/${slug}`} style={{ textDecoration: 'none' }}>
      <_BlogPostLink key={title}>
        <H2 align={'left'} bold>
          {title}
        </H2>
        <Description>{description}</Description>

        <Footer>
          <Button backgroundImage={background}>Read More</Button>
          <ByAt>
            <b>{author}</b> posted this on {date}
          </ByAt>
        </Footer>
      </_BlogPostLink>
    </Link>
  )
}
