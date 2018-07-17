import React from 'react'
import Helmet from 'react-helmet'

import { pages } from '../site'

export function TitleAndMetaTags({ url, pathname, title, description }) {
  const pageConfig =
    pages[pages.findIndex((p) => p.id === pathname.split('/')[0])]
  const favIconName = !!pageConfig ? `favicon-${pageConfig.id}` : 'favicon'

  return (
    <Helmet>
      <title>
        {title} – {description}
      </title>
      <link rel="icon" href={`${favIconName}.ico`} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${favIconName}-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${favIconName}-16x16.png`}
      />

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous"
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
