import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from '../styles/media'

const MarkDownContainer = styled.div`
  width: 100%; //ie11 bug
  color: ${(props) => (props.inverted ? 'white' : '#222;')};
  white-space: ${(props) => props.whiteSpace};

  h1 {
    font-weight: 400;
    margin: 0em 0 0.5em 0;
  }

  h2 {
    font-weight: 500;
  }

  p {
    font-weight: 400;
    font-size: 1.15em;
    line-height: 1.5em;
    color: ${(props) => (props.inverted ? 'white' : '#444;')};
    margin: 0em;
  }

  ul,
  ol {
    white-space: normal;
  }

  li {
    font-weight: 400;
    font-size: 1.15em;
    margin: 0.5em 0;
    color: ${(props) => (props.inverted ? 'white' : '#222;')};
  }

  figure {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > figcaption {
      margin-top: 1em;
    }
  }

  img {
    padding: 1rem;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid #eee;

    ${media.largePhone`
      padding: 1rem 0;
      width: 100%;
    `};
  }

  table {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 10px;
  }

  th {
    text-align: left;
  }

  thead > tr > th {
    border-bottom: 1px solid #eee;
    padding: 1em;
  }

  tbody > tr > td {
    font-weight: 400;
    padding: 10px 40px 10px 0px;
  }

  pre {
    padding: 2em;
    background-color: #f7f7f7;
    overflow: auto;
  }

  code {
    padding: 4px;
    background-color: #f7f7f7;
  }

  ${(props) => props.customCSS};
`

class MarkdownContent extends React.Component {
  render() {
    const { style, inverted, customCSS, whiteSpace, html } = this.props
    return (
      <MarkDownContainer
        style={style}
        inverted={inverted}
        customCSS={customCSS}
        whiteSpace={whiteSpace}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}

MarkdownContent.defaultProps = {
  whiteSpace: 'pre-line',
  customCSS: '',
}

MarkdownContent.propTypes = {
  inverted: PropTypes.bool,
  customCSS: PropTypes.string,
  whiteSpace: PropTypes.string,
}

export default MarkdownContent
