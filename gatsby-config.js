module.exports = {
  siteMetadata: {
    title: 'PlanetScale',
    siteUrl: 'https://planetscale.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PlanetScale`,
        short_name: `PlanetScale`,
        start_url: `/`,
        theme_color: `#ffffff`,
        background_color: `#ffffff`,
        display: `standalone`,
        lang: `en`,
        icon: `src/images/ps-logo.png`,
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
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
        host: 'https://planetscale.com',
        sitemap: 'https://planetscale.com/sitemap.xml',
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
      options: {
        exclude: ['/faq/*', '/thanks', '/team/*'],
      },
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
        name: 'news',
        path: `${__dirname}/content/news/`,
      },
    },
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
        name: 'team',
        path: `${__dirname}/content/team/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'faq',
        path: `${__dirname}/content/faq/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sla',
        path: `${__dirname}/content/sla/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'dbaas',
        path: `${__dirname}/content/dbaas/`,
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${__dirname}/content/components/`,
      },
    },
    {
      resolve: 'gatsby-source-greenhouse',
      options: {
        apiToken: process.env.GREENHOUSE_API_TOKEN,
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
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['poppins:100, 300, 400, 500, 700'],
        display: 'swap',
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
  ],
}
