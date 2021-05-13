module.exports = {
  siteMetadata: {
    title: 'PlanetScale Docs',
    siteUrl: 'https://docs.planetscale.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'PlanetScale Documentation',
        short_name: 'PlanetScale',
        start_url: '/docs/index',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        lang: 'en',
        icon: 'static/favicon_32_dark.png',
        include_favicon: false,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://docs.planetscale.com',
        sitemap: 'https://docs.planetscale.com/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: '/v1/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-sitemap',
      options: {
        exclude: ['/404', '/dev-404-page', '/404.html', /(\/)v1(\/)(.*)/],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content/docs/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'v1',
        path: `${__dirname}/content/v1/`,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Inter',
              variants: ['300', '400', '600'],
              fontDisplay: 'swap',
              strategy: 'cdn',
            },
            {
              family: 'IBM+Plex+Mono',
              variants: ['400'],
              fontDisplay: 'swap',
              strategy: 'cdn',
            },
          ],
        },
        formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-mixins'),
          require('postcss-import'),
          require('postcss-nested'),
          require('autoprefixer'),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: `gURNntij37hKxpSUjda9znzNaOxZBG6H`,
        trackPage: true,
        trackPageDelay: 50,
      },
    },
  ],
}
