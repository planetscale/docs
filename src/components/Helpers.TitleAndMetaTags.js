import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

export function TitleAndMetaTags({
  url,
  pathname,
  title,
  type,
  description,
  schemaOrgJSONLD,
}) {
  useEffect(() => {
    const docSearchScript = document.getElementById('docsearch')
    const highlightScript = document.getElementById('highlight')

    if (!docSearchScript) {
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
      script.id = 'docsearch'
      document.body.appendChild(script)

      script.onload = () => {
        if (docSearchCallback) docSearchCallback()
      }
    }

    if (!highlightScript) {
      const script = document.createElement('script')
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/highlight.min.js'
      script.id = 'highlight'
      document.body.appendChild(script)

      script.onload = () => {
        if (highlightCallback) highlightCallback()
      }
    }

    if (highlightScript && highlightCallback) highlightCallback()
    if (docSearchScript && docSearchCallback) docSearchCallback()
  })

  function highlightCallback() {
    hljs.initHighlightingOnLoad()
  }

  function docSearchCallback() {
    docsearch({
      apiKey: 'c05ee5734758d9d4d948be01d548da67',
      indexName: 'planetscale',
      inputSelector: '#searchbox',
      debug: false,
      transformData: (hits) => {
        let newHits = []
        hits.map((hit) => {
          if (hit.anchor !== null) {
            newHits.push(hit)
          }
        })
        return newHits
      },
    })
  }

  return (
    <Helmet>
      <title>{title + ' - Documentation - PlanetScale'}</title>

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="description" content={description}></meta>

      <meta property="og:url" content={`${url}/${pathname}`} />
      <meta property="og:image" content={`${url}/social_share.png`} />
      <meta property="og:type" content={type} />
      <meta
        property="og:title"
        content={title + ' - Documentation - PlanetScale'}
      />
      <meta property="og:description" content={description} />

      <meta name="twitter:url" content={`${url}/${pathname}`} />
      <meta name="twitter:image" content={`${url}/social_share.png`} />
      <meta
        name="twitter:title"
        content={title + ' - Documentation - PlanetScale'}
      />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@planetscaledata" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@planetscaledata" />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/atom-one-dark-reasonable.min.css"
      />

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
      />
    </Helmet>
  )
}

TitleAndMetaTags.defaultProps = {
  url: 'https://docs.planetscale.com/',
  pathname: '',
  title: 'PlanetScale - Serverless Database for Developers',
  type: 'website',
  description: 'Start small and grow to massive scale',
  schemaOrgJSONLD: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: 'PlanetScale, Inc.',
    url: 'https://docs.planetscale.com',
    sameAs: [
      'https://twitter.com/planetscaledata',
      'https://www.facebook.com/planetscaledata',
      'https://www.instagram.com/planetscale',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '321 Castro St #200',
      addressLocality: 'Mountain View',
      addressRegion: 'CA',
      postalCode: '94041',
      addressCountry: 'US',
    },
  },
}
