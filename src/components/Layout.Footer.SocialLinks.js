import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

const SocialLinks = styled.div`
  ${media.largePhone`
    font-size: 1.5em;
    line-height: 3em;
  `};
`

const Social = styled.a`
  color: white;
  opacity: 0.5;
  transition: all 0.2s;
  font-size: 1.8rem;

  &:nth-child(n + 2) {
    margin-left: 10px;
  }

  &:hover {
    opacity: 1;
  }

  ${media.largePhone`
    font-size: 1.4rem;
  `};
`

export default function _SocialLinks() {
  return (
    <SocialLinks>
      <Social href="https://twitter.com/planetscaledata" target="_blank">
        <i className="fab fa-twitter-square" />
      </Social>
      <Social href="https://www.facebook.com/planetscaledata/" target="_blank">
        <i className="fab fa-facebook-square" />
      </Social>
      <Social
        href="https://www.linkedin.com/company/planetscale"
        target="_blank"
      >
        <i className="fab fa-linkedin" />
      </Social>
    </SocialLinks>
  )
}
