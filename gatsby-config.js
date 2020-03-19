module.exports = {
  siteMetadata: {
    title: 'PlanetScale',
    siteUrl: 'https://docs.planetscale.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PlanetScale`,
        short_name: `PlanetScale`,
        start_url: `/docs/index`,
        theme_color: `#ffffff`,
        background_color: `#ffffff`,
        display: `standalone`,
        lang: `en`,
        icon: `static/android-chrome-512x512.png`,
        icons: [
          {
            src: 'static/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'static/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
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
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#ffffff',
        showSpinner: false,
      },
    },
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages/`,
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Poppins:400,500,700'],
        },
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              showCaptions: true,
              markdownCaptions: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-lodash',
  ],
}
