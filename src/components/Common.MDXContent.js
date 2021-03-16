import React, { useEffect } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import CodeBlock from './Common.CodeBlock'
import { ContentBlock } from './Layout.Wrapper'

const MarkDownContainer = styled(ContentBlock)`
  width: 100%; //ie11 bug
  max-width: 80ch;
  white-space: normal;
  overflow: auto;
  max-width: ${(props) => props.maxWidth};

  h1 {
    font-weight: 900;
    font-size: 3em;
    margin: 0em 0 1em 0;

    ${media.phone`
      font-size: 2.5em;
    `}
  }

  h2 {
    font-weight: 700;
    font-size: 2em;
    margin-top: 1.5em;
    margin-bottom: 0;
  }

  h3 {
    font-weight: 700;
    font-size: 1.2em;
    margin-top: 2.5em;
    margin-bottom: 0;
  }

  a {
    color: var(--text-blue);
    text-decoration: none;
    border-bottom: 1px solid var(--bg-primary);
    transition: border-bottom 0.25s ease;

    &:hover {
      border-bottom: 1px solid var(--text-blue);
    }
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 1.5em;
  }

  ul,
  ol {
    white-space: normal;
  }

  li {
    font-weight: 400;
    font-size: 17px;
    line-height: 1.5em;
    margin: 1em 0;
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
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 6px;

    ${media.phone`
      padding: 1rem 0;
      width: 100%;
    `};
  }

  table {
    border: 1px solid var(-accent);
    border-radius: 4px;
    padding: 0 10px;
  }

  th {
    text-align: left;
  }

  thead > tr > th {
    border-bottom: 1px solid var(--accent);
    padding: 1em;
  }

  tbody > tr > td {
    font-weight: 400;
    padding: 10px 40px 10px 0px;
  }

  table.table {
    width: 100%;
    margin-bottom: 1rem;
    color: var(--foreground2);
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
    border-bottom: 2px solid var(--accent);
  }

  table.table tbody + tbody {
    border-top: 2px solid var(--accent);
  }

  table.table thead.thead-dark th {
    background-color: var(--background2);
    border-color: var(--accent);
  }

  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export default function MDXContent({ body }) {
  useEffect(() => {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre > code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  })

  return (
    <MarkDownContainer>
      <MDXProvider
        components={{
          pre: CodeBlock,
        }}
      >
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </MarkDownContainer>
  )
}
