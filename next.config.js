const withMDX = require('@next/mdx')({
  extension: /\.mdx$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
})

module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap')
    }

    return config
  },
  async redirects() {
    return [
      {
        source: '/tutorial/:slug*',
        destination: '/tutorials/:slug*', // Matched parameters can be used in the destination
        permanent: true
      },
      {
        source: '/tutorials/deploy-to-heroku',
        destination: '/tutorials/connect-any-application',
        permanent: true
      },
      {
        source: '/v1/vitess-operator/:match*',
        destination: 'https://github.com/planetscale/vitess-operator/tree/main/docs',
        permanent: true
      },
      {
        source: '/v1/:match*',
        destination: '/',
        permanent: true
      },
      {
        source: '/reference/planetscale-security',
        destination: '/reference/secure-connections',
        permanent: true
      },
      {
        source: '/tutorials/change-unique-key',
        destination: '/learn/change-unique-key',
        permanent: true
      },
      {
        source: '/tutorials/operating-without-foreign-keys',
        destination: '/learn/operating-without-foreign-keys-constraints',
        permanent: true
      },
      {
        source: '/reference/planetscale-environment-setup',
        destination: '/concepts/planetscale-environment-setup',
        permanent: true
      },
      {
        source: '/reference/secure-connections',
        destination: '/concepts/secure-connections',
        permanent: true
      },
      {
        source: '/reference/service-tokens',
        destination: '/concepts/service-tokens',
        permanent: true
      }
    ]
  }
}
