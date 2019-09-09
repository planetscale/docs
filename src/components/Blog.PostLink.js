import React from 'react'
import styled from 'styled-components'
import { ButtonLink } from './Common.Button'
import { media } from '../styles/media'

export const BlogPosts = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const _BlogPostLink = styled.li`
  margin: 0;
  padding: 3em 0;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  ${media.largePhone`
    padding: 2em;
  `};
`

const Date = styled.div`
  margin-bottom: 1em;
  font-weight: 300;
  font-size: 0.9em;
  color: #666;
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
`

const Description = styled.p`
  font-weight: 400;
  font-size: 1.1em;
  color: #555;
  margin: 0;
  padding: 1em 0 0;
`

export function BlogPostLink({ title, description, date, author, slug }) {
  return (
    <_BlogPostLink key={title}>
      <Date>{date}</Date>
      <ButtonLink href={`/news/${slug}`}>
        <Title>{title}</Title>
      </ButtonLink>
      <Description>{description}</Description>
    </_BlogPostLink>
  )
}
