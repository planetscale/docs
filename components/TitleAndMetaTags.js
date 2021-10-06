import React, { useEffect, useContext } from 'react'
import Head from 'next/head'

export function TitleAndMetaTags({
  url,
  pathname,
  title,
  type,
  description,
  banner,
  schemaOrgJSONLD,
}) {
  useEffect(() => {
    if ('serviceworker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister()
        }
      })
    }
  })

  useEffect(() => {
    const docSearchScript = document.getElementById('docsearch')
    if (!docSearchScript) {
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
      script.id = 'docsearch'
      script.defer = true
      document.head.appendChild(script)
      script.onload = () => {
        if (docSearchCallback) docSearchCallback()
      }
    }
    if (docSearchScript && docSearchCallback) docSearchCallback()
  })

  function docSearchCallback() {
    if (typeof docsearch == 'function') {
      docsearch({
        appId: 'BPNL9VRVWI',
        apiKey: '4e224ba0c25e61356926e32048d5a110',
        indexName: 'planetscale-docs',
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
  }

  return (
    <Head>
      <title>{title + ' - Documentation - PlanetScale'}</title>

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="description" content={description}></meta>

      <meta property="og:url" content={`${url}/${pathname}`} />
      <meta property="og:image" content={`${url}/${banner}`} />
      <meta property="og:type" content={type} />
      <meta
        property="og:title"
        content={title + ' - Documentation - PlanetScale'}
      />
      <meta property="og:description" content={description} />

      <meta name="twitter:url" content={`${url}/${pathname}`} />
      <meta name="twitter:image" content={`${url}/${banner}`} />
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
    </Head>
  )
}

TitleAndMetaTags.defaultProps = {
  url: 'https://docs.planetscale.com',
  pathname: '',
  title: 'PlanetScale - Serverless Database for Developers',
  type: 'website',
  description: 'Start small and grow to massive scale',
  banner: 'img/internals/social_share.png',
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
