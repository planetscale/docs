const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})

module.exports = {
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
}
