const fs = require('fs')

const prettier = require('prettier')

const meta = require('../content/docs/meta.json')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const baseURL = {
    development: process.env.NEXT_PUBLIC_VERCEL_URL,
    preview: process.env.NEXT_PUBLIC_VERCEL_URL,
    production: 'docs.planetscale.com'
  }[process.env.NEXT_PUBLIC_VERCEL_ENV]

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://${baseURL}/</loc></url>
          ${meta.order
            .map((category) => {
              return category.pages
                .map((page) => {
                  const url = `<url><loc>https://${baseURL}/${category.id}/${page.route}</loc></url>`
                  return url
                })
                .join('')
            })
            .join('')}
        </urlset>
    `

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
