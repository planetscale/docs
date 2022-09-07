const crypto = require('crypto')

const segment = require('@segment/snippet')

const {
  // This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
  ANALYTICS_WRITE_KEY = 'gURNntij37hKxpSUjda9znzNaOxZBG6H'
} = process.env

const SegmentSnippet = segment.min({
  apiKey: ANALYTICS_WRITE_KEY,
  page: false
})

const SegmentSnippetSHA256 = crypto.createHash('sha256').update(SegmentSnippet).digest('base64')

module.exports.SegmentSnippet = SegmentSnippet
module.exports.SegmentSnippetSHA256 = SegmentSnippetSHA256
