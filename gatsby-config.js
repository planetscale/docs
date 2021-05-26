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
        exclude: [
          '/404',
          '/404.html',
          '/v1',
          '/v1/quickstart/managed-quickstart',
          '/v1/concepts/overview',
          '/v1/concepts/availability-features',
          '/v1/concepts/performance-features',
          '/v1/concepts/security-features',
          '/v1/concepts/clusters',
          '/v1/concepts/databases',
          '/v1/concepts/sharding-schemes',
          '/v1/concepts/deployment',
          '/v1/concepts/database-instances',
          '/v1/concepts/analytics-instances',
          '/v1/concepts/backups',
          '/v1/concepts/database-links',
          '/v1/concepts/compatibility-testing',
          '/v1/setup/creating-cluster',
          '/v1/setup/creating-database',
          '/v1/setup/configuring-sharding',
          '/v1/setup/adding-users',
          '/v1/setup/connecting-to-db',
          '/v1/setup/secure-connection',
          '/v1/setup/allowing-ips',
          '/v1/setup/user-and-password-management',
          '/v1/setup/linking-external-database',
          '/v1/setup/delete-a-cluster',
          '/v1/use/importing-data',
          '/v1/use/migrating-database-schemas',
          '/v1/use/reconfiguring-database',
          '/v1/use/resharding',
          '/v1/use/undeploying-database',
          '/v1/use/restoring-backups',
          '/v1/use/viewing-status-messages',
          '/v1/use/viewing-query-logs',
          '/v1/reference/operational-guidelines',
          '/v1/reference/mysql-compatibility',
          '/v1/reference/pricing',
          '/v1/reference/advanced-cluster-configuration',
          '/v1/reference/sharding-scheme-ddl',
          '/v1/psdb-operator/overview',
          '/v1/psdb-operator/getting-access',
          '/v1/psdb-operator/topology-guide',
          '/v1/psdb-operator/gcp-quickstart',
          '/v1/psdb-operator/api',
          '/v1/vitess-operator/overview',
          '/v1/vitess-operator/aws-quickstart',
          '/v1/vitess-operator/gcp-quickstart',
          '/v1/vitess-operator/api',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
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
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: `NetworkFirst`,
            },
            {
              urlPattern:
                /^https?:.*\/page-data\/.*\/(page-data|app-data)\.json$/,
              handler: `NetworkFirst`,
              options: {
                networkTimeoutSeconds: 1,
              },
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: `NetworkFirst`,
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `NetworkFirst`,
            },
            {
              urlPattern: /\/$/,
              handler: `NetworkFirst`,
              options: {
                networkTimeoutSeconds: 1,
              },
            },
          ],
        },
      },
    },
  ],
}
