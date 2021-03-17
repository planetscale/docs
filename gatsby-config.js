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
        icon: 'static/logo_square.svg',
        icon_options: {
          purpose: 'any maskable',
        },
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
            disallow: '/admin',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
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
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: false,
      },
    },
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
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `open-source-docs`,
        remote: `https://github.com/planetscale/open-source-docs.git`,
        branch: `prod`,
      },
    },
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
          require('autoprefixer')
        ]
      }
    },    
  ],
}
