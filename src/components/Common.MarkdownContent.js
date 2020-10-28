import * as React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'

const MarkDownContainer = styled.div`
  width: 100%; //ie11 bug
  color: #000;
  background-color: #fff;
  white-space: pre-line;
  overflow: auto;
  padding: 4em;
  max-width: ${(props) => props.maxWidth};

  ${media.phone`
    padding: 2em;
  `}

  h1 {
    font-weight: 700;
    margin: 0em 0 0.5em 0;
  }

  h2 {
    font-weight: 500;
    margin-top: 1.5em;
    margin-bottom: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5em;
  }

  p {
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    margin: 0em;
  }

  ul,
  ol {
    white-space: normal;
  }

  li {
    font-weight: 400;
    font-size: 1em;
    margin: 0.5em 0;
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

    ${media.phone`
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
    overflow: scroll;
  }

  table.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }

  table.table th,
  table.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-bottom: none;
    white-space: normal;
  }

  table.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }

  table.table tbody + tbody {
    border-top: 2px solid #dee2e6;
  }

  table.table thead.thead-dark th {
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
  }

  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

class MarkdownContent extends React.Component {
  render() {
    const { style, inverted, whiteSpace, html, contentStyle } = this.props
    let maxWidth = '90ch'
    if (contentStyle == 'wide') {
      maxWidth = 'none'
    }
    return (
      <MarkDownContainer
        style={style}
        maxWidth={maxWidth}
        inverted={inverted}
        whiteSpace={whiteSpace}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}

export default MarkdownContent
