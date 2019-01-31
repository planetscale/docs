module.exports = {
  siteMetadata: {
    title: 'PlanetScale',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-crisp-chat',
      options: {
        websiteId: '49d76117-cce4-416f-9ac9-dac89fd7e93a',
        enableDuringDevelop: true,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-119876285-1',
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/content/news/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `team`,
        path: `${__dirname}/content/team/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faq`,
        path: `${__dirname}/content/faq/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sla`,
        path: `${__dirname}/content/sla/`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
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
  ],
}
