const crypto = require('crypto')

const segment = require('@segment/snippet')

const { ANALYTICS_WRITE_KEY } = process.env

let SegmentSnippet
let SegmentSnippetSHA256

if (ANALYTICS_WRITE_KEY) {
  SegmentSnippet = segment.min({
    apiKey: ANALYTICS_WRITE_KEY,
    page: false
  })

  SegmentSnippetSHA256 = crypto.createHash('sha256').update(SegmentSnippet).digest('base64')
}

module.exports.SegmentSnippet = SegmentSnippet
module.exports.SegmentSnippetSHA256 = SegmentSnippetSHA256
