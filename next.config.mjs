import MDX from '@next/mdx'
import withNextjsStaticProps from 'recma-nextjs-static-props'
import withFrontmatter from 'remark-frontmatter'
import withGitHubFlavoredMarkdown from 'remark-gfm'
import withMdxFrontmatter from 'remark-mdx-frontmatter'

const withMDX = MDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [withFrontmatter, withGitHubFlavoredMarkdown, withMdxFrontmatter],
    rehypePlugins: [],
    recmaPlugins: [withNextjsStaticProps],
    providerImportSource: '@mdx-js/react'
  }
})

const { NODE_ENV } = process.env
import segment from './lib/segment.js'
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
    "img-src 'self' https://www.netlify.com https://vercel.com data:",
    "prefetch-src 'self'",
    `form-action 'self'`,
    "frame-ancestors 'none'"
  ]
  return policies.join('; ')
}
const CONTENT_SECURITY_POLICY = csp()

export default withMDX({
  basePath: '/docs',
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    if (options.isServer) {
      import('./scripts/generate-sitemap.js');
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
        source: '/',
        destination: '/docs',
        basePath: false,
        permanent: true
      },
      {
        source: '/concepts/billing/planetscale-plans',
        destination: '/concepts/billing',
        permanent: true
      },
      {
        source: '/concepts/query-statistics',
        destination: '/concepts/query-insights',
        permanent: true
      },
      {
        source: '/import-tool-migration-addresses',
        destination: '/reference/import-tool-migration-addresses',
        permanent: true
      },
      {
        source: '/learn/change-unique-key',
        destination: '/learn/change-single-unique-key',
        permanent: true
      },
      {
        source: '/learn/operating-without-foreign-keys-constraints',
        destination: '/learn/operating-without-foreign-key-constraints',
        permanent: true
      },
      {
        source: '/lib/prisma',
        destination: '/tutorials/prisma-quickstart',
        permanent: true
      },
      {
        source: '/tutorials/change-unique-key',
        destination: '/learn/change-single-unique-key',
        permanent: true
      },
      {
        source: '/tutorials/deploy-to-heroku',
        destination: '/tutorials/connect-any-application',
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
        source: '/reference/planetscale-security',
        destination: '/concepts/secure-connections',
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
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: 'https://docs.planetscaledb.io/docs/robots.txt',
        basePath: false
      }
    ]
  }
})
