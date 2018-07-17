import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'
import { media } from '../styles/media'

import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/team-bg.svg'

import { LinkedinIcon } from 'react-share'

export const TeamMemberContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 5em 0 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

const _TeamMember = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2em;
  width: 100%;

  ${media.largePhone`
    flex-direction: column;
    margin: 0;
    align-items: center;
  `};
`

const Content = styled.div`
  margin: 0 3em;

  ${media.largePhone`
    margin: 0 0 3em;
    padding: 0 0 1.5em;
    border-bottom: 1px solid #eee;
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
  font-weight 100;
  margin: 0 0 10px;

  ${media.largePhone`
    text-align: center;
    margin-bottom: 1em;
  `}
`

const ImageContainer = styled.div``

const Image = styled.img`
  border-radius: 300px;
  width: 200px;
  height: 200px;
  object-fit: cover;

  ${media.largePhone`
    margin-bottom: 1em;
  `};
`

const iconStyle = {
  fontSize: '1.2em',
  opacity: `0.2`,
}

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
        <OutboundLink
          href={'https://www.linkedin.com/in/' + linkedin}
          target="_blank"
          rel="nofollow"
        >
          <i className="fab fa-linkedin" style={iconStyle} />
        </OutboundLink>
      </Content>
    </_TeamMember>
  )
}
