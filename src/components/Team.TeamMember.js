import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import MarkdownContent from '../components/Common.MarkdownContent'

import background from '../images/hero/team-bg.svg'
import linkedinLogo from '../images/social/linkedin.png'

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
  font-weight: 100;
  margin: 0;
`

const Image = styled.img`
  border-radius: 300px;
  width: 200px;
  margin: 3em 0;
`

const LinkedIn = styled.img`
  width: 75px;
`

export function TeamMember({ name, image, bio, linkedin }) {
  return (
    <_TeamMember key={name}>
      <Name>{name}</Name>
      <Image src={image} />
      <MarkdownContent html={bio} />
      <a href={linkedin} target="_blank" rel="no-follow">
        <LinkedIn src={linkedinLogo} />
      </a>
    </_TeamMember>
  )
}
