import React, { useContext } from 'react'
import Helmet from 'react-helmet'
import { ThemeContext } from './styles/themeContext'

export function TitleAndMetaTags({
  url,
  pathname,
  title,
  type,
  description,
  banner,
  schemaOrgJSONLD,
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <Helmet>
      <title>{title + ' - Documentation - PlanetScale'}</title>

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/favicon_32_${themeContext.getActiveSystemMode().name}.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/favicon_16_${themeContext.getActiveSystemMode().name}.png`}
      />

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
    </Helmet>
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
