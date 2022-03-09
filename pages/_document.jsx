import React from 'react'

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { SegmentSnippet } from '../lib/segment'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <script dangerouslySetInnerHTML={{ __html: SegmentSnippet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
