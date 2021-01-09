import * as React from 'react'
import Helmet from 'react-helmet'

export function TitleAndMetaTags({
  url,
  pathname,
  title,
  type,
  description,
  schemaOrgJSONLD,
}) {
  return (
    <Helmet>
      <title>{title + ' - PlanetScale Documentation'}</title>

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
      <meta property="og:title" content={title + ' - PlanetScale'} />
      <meta property="og:description" content={description} />

      <meta name="twitter:url" content={`${url}/${pathname}`} />
      <meta name="twitter:image" content={`${url}/social_share.png`} />
      <meta
        name="twitter:title"
        content={title + ' - PlanetScale Documentation'}
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
