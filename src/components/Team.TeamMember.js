import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/team-bg.svg'

import { LinkedinIcon } from 'react-share'

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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em;
  max-width: 325px;
  width: 100%; //ie11 bug
`

const Name = styled.h2`
  font-size: 1.5em;
  font-weight: 200;
  margin: 0;
`

const Image = styled.img`
  border-radius: 300px;
  width: 200px;
  margin: 3em 0;
`

const Role = styled.h3`
      font-size: 1.5em;
      font-weight 100;
      margin: 0;
`

export function TeamMember({ name, role, image, bio, linkedin }) {
  return (
    <_TeamMember key={name}>
      <Name>{name}</Name>
      <Role>{role}</Role>
      <Image src={image} />
      <MarkdownContent html={bio} />
      <OutboundLink href={linkedin} target="_blank" rel="nofollow">
        <LinkedinIcon size={32} round={true} />
      </OutboundLink>
    </_TeamMember>
  )
}
