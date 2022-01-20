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
      }
    ]
  }
}
