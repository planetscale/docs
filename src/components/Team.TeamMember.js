import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

import MarkdownContent from '../components/Common.MarkdownContent'

export const TeamMemberContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _TeamMember = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: top;
  padding: 4em 0;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  ${media.largePhone`
    flex-direction: column;
    margin: 0;
    padding: 4em 2em 2em;
    align-items: center;
  `};
`

const Content = styled.div`
  margin: 0 3em;

  ${media.largePhone`
    margin: 0;
  `};
`

const Name = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 5px;

  ${media.largePhone`
    text-align: center;
  `};
`

const Role = styled.h3`
  font-size: 1.5em;
  font-weight: 100;
  margin: 0 0 10px;

  ${media.largePhone`
    text-align: center;
    margin-bottom: 1em;
  `}
`

const ImageContainer = styled.div``

const Image = styled.img`
  border-radius: 300px;
  border: 1px solid;
  width: 150px;
  height: 150px;
  object-fit: cover;

  ${media.largePhone`
    margin-bottom: 1em;
  `};
`

const iconStyle = {
  fontSize: '1.2em',
  opacity: '0.2',
}

const LinkedInLink = styled.a`
  display: inline-block;
  margin-top: 0.5em;

  ${media.largePhone`
    margin-top: 2em;
  `}
`

export function TeamMember({ name, role, image, bio, linkedin }) {
  return (
    <_TeamMember key={name}>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <Content>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <MarkdownContent html={bio} />
        <LinkedInLink
          href={
            linkedin === 'rocco'
              ? 'https://www.linkedin.com/company/planetscale'
              : 'https://www.linkedin.com/in/' + linkedin
          }
          target="_blank"
          rel="nofollow"
        >
          <i className="fab fa-linkedin" style={iconStyle} />
        </LinkedInLink>
      </Content>
    </_TeamMember>
  )
}
