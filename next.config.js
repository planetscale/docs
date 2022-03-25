const withMDX = require('@next/mdx')({
  extension: /\.mdx$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
})

const { NODE_ENV } = process.env
const segment = require('./lib/segment')
const segmentInlineSHA = `sha256-${segment.SegmentSnippetSHA256}`

function csp() {
  const isDev = NODE_ENV === 'development'

  // There's no good way right now to compute this at build time
  // so this has to be manually kept in sync with the `next-themes` NPM package.
  const nextThemeInlineScriptHash = 'sha256-GtjUtmgtscBVAFveDly2Ug+LL+cy4ZbxFsH2nbefPAo='

  const policies = [
    "base-uri 'self'",
    'block-all-mixed-content',
    "default-src 'self'",
    "frame-src 'none'",
    `connect-src 'self' https://cdn.segment.com https://api.segment.io https://*.algolia.net https://*.algolianet.com ${
      isDev && 'ws:'
    }`,
    `script-src 'self' '${segmentInlineSHA}' '${nextThemeInlineScriptHash}' https://cdn.jsdelivr.net https://cdn.segment.com 'unsafe-eval'`,
    "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'",
    "img-src 'self' https://vercel.com data:",
    "prefetch-src 'self'",
    `form-action 'self'`,
    "frame-ancestors 'none'"
  ]
  return policies.join('; ')
}
const CONTENT_SECURITY_POLICY = csp()

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: CONTENT_SECURITY_POLICY
          },
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '0'
          }
        ]
      }
    ]
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
        destination: '/learn/operating-without-foreign-key-constraints',
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
