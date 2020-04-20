import * as React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

const _SocialLinks = styled.div`
  ${media.largePhone`
    font-size: 1.5em;
    line-height: 3em;
  `};
`

const Social = styled.a`
  color: #db3d22;
  transition: all 0.2s;
  font-size: 1.5rem;

  &:nth-child(n + 2) {
    margin-left: 10px;
  }

  &:hover {
    color: #000000;
  }

  ${media.largePhone`
    font-size: 1.4rem;
  `};
`

export default function SocialLinks() {
  return (
    <_SocialLinks>
      <Social href="https://twitter.com/planetscaledata" target="_blank">
        <i className="fab fa-twitter" />
      </Social>
      <Social href="https://www.facebook.com/planetscaledata/" target="_blank">
        <i className="fab fa-facebook" />
      </Social>
      <Social
        href="https://www.linkedin.com/company/planetscale"
        target="_blank"
      >
        <i className="fab fa-linkedin" />
      </Social>
      <Social href="https://github.com/vitessio/vitess" target="_blank">
        <i className="fab fa-github" />
      </Social>
      <Social
        href="https://stackoverflow.com/questions/tagged/vitess"
        target="_blank"
      >
        <i className="fab fa-stack-overflow" />
      </Social>
    </_SocialLinks>
  )
}
