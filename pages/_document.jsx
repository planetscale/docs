import React from 'react'

import * as snippet from '@segment/snippet'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const {
  // This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
  ANALYTICS_WRITE_KEY = 'gURNntij37hKxpSUjda9znzNaOxZBG6H',
  NODE_ENV = 'development'
} = process.env

export default class Document extends NextDocument {
  renderSnippet() {
    const opts = {
      apiKey: ANALYTICS_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true
    }

    if (NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts)
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <meta content='#262626' name='theme-color' />
          <link rel='mask-icon' href='/favicon.svg' color='#262626' />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
