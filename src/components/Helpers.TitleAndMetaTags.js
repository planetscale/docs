import React from 'react'
import Helmet from 'react-helmet'

export function TitleAndMetaTags({ url, pathname, title, description }) {
  return (
    <Helmet>
      <title>{title}</title>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
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

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
        crossOrigin="anonymous"
      />

      <meta property="og:url" content={`${url}/${pathname}`} />
      <meta property="og:image" content={`${url}/img/social-1.png`} />
      <meta property="og:image" content={`${url}/img/social-2.png`} />
      <meta property="og:image" content={`${url}/img/social-3.png`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:url" content={`${url}/${pathname}`} />
      <meta name="twitter:image" content={`${url}/img/social-1.png`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@planetsclae" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@planetsclae" />
    </Helmet>
  )
}

//TODO: Iterate on this content
TitleAndMetaTags.defaultProps = {
  url: 'https://planetscale.com',
  pathname: '',
  title: 'PlanetScale',
  description: 'PlanetScale',
}
