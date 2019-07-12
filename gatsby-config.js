module.exports = {
  siteMetadata: {
    title: 'PlanetScale',
    siteUrl: 'https://planetscale.com',
  },
  plugins: [
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
    'gatsby-transformer-remark',
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
      resolve: 'gatsby-source-greenhouse',
      options: {
        apiToken: 'fde04402b62d4e24777f64abf9056cd2-2',
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-KL98Z8C',
        includeInDevelopment: true,
      },
    },
    {
      resolve: 'gatsby-plugin-crisp-chat',
      options: {
        websiteId: '49d76117-cce4-416f-9ac9-dac89fd7e93a',
        enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
        defer: true, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
      },
    },
  ],
}
