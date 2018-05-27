import React from 'react'
import styled from 'styled-components'

import { media } from '../styles/media'

const MarkDownContainer = styled.div`
  width: 100%; //ie11 bug
  color: ${(props) => (props.inverted ? 'white' : '#222;')};

  h1 {
    font-weight: 300;
    margin: 1.5em 0 0.5em 0;
  }

  h2 {
    font-weight: 500;
  }

  p {
    font-weight: 300;
    font-size: 1.15em;
    line-height: 1.5em;
    color: ${(props) => (props.inverted ? 'white' : '#444;')};
    margin-top: 0em;
  }

  ul,
  ol {
    -webkit-padding-start: 1em;
  }

  li {
    font-weight: 300;
    font-size: 1.15em;
    margin: 0.5em 0;
    color: ${(props) => (props.inverted ? 'white' : '#222;')};
  }

  img {
    padding: 5rem;
    width: 100%;
    height: auto;
    box-sizing: border-box;

    & + span {
      margin-top: -2em;
    }

    ${media.largePhone`
      padding: 1rem 0;
      width: 100%;
    `};
  }
`

class MarkdownContent extends React.Component {
  render() {
    return (
      <MarkDownContainer
        style={this.props.style}
        inverted={this.props.inverted}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    )
  }
}

export default MarkdownContent
