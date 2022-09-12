import React, { useEffect } from 'react'

import Head from 'next/head'

export function TitleAndMetaTags({ url, pathname, title, type, description, banner, schemaOrgJSONLD }) {
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
      script.src = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
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
      // eslint-disable-next-line
      docsearch({
        appId: 'BPNL9VRVWI',
        apiKey: '4e224ba0c25e61356926e32048d5a110',
        indexName: 'planetscale-docs',
        inputSelector: '#searchbox',
        debug: false
      })
    }
  }

  const currentUrl = pathname ? `${url}${pathname}` : url

  return (
    <Head>
      <title>{title + ' - Documentation - PlanetScale'}</title>

      <link rel='canonical' href={currentUrl} />

      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='description' content={description}></meta>

      <meta property='og:url' content={currentUrl} />
      <meta property='og:image' content={banner} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title + ' - Documentation - PlanetScale'} />
      <meta property='og:description' content={description} />

      <meta name='twitter:url' content={currentUrl} />
      <meta name='twitter:image' content={banner} />
      <meta name='twitter:title' content={title + ' - Documentation - PlanetScale'} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content='@planetscaledata' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@planetscaledata' />

      <script type='application/ld+json'>{JSON.stringify(schemaOrgJSONLD)}</script>
    </Head>
  )
}

TitleAndMetaTags.defaultProps = {
  url: 'https://planetscale.com/docs',
  title: 'PlanetScale - Serverless Database for Developers',
  type: 'website',
  description: 'Start small and grow to massive scale',
  banner: 'https://planetscale.com/docs/img/internals/social_share.png',
  schemaOrgJSONLD: {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: 'PlanetScale, Inc.',
    url: 'https://planetscale.com/docs',
    sameAs: [
      'https://twitter.com/planetscaledata',
      'https://www.facebook.com/planetscaledata',
      'https://www.instagram.com/planetscale'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '321 Castro St #200',
      addressLocality: 'Mountain View',
      addressRegion: 'CA',
      postalCode: '94041',
      addressCountry: 'US'
    }
  }
}
