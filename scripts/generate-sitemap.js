const fs = require('fs')

const prettier = require('prettier')

const meta = require('../content/docs/meta.json')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

  const baseURL = {
    development: `${process.env.NEXT_PUBLIC_VERCEL_URL}/docs`,
    preview: `${process.env.NEXT_PUBLIC_VERCEL_URL}/docs`,
    production: 'planetscale.com/docs'
  }[process.env.NEXT_PUBLIC_VERCEL_ENV]

  const traversePage = (page, path) => {
    let pages = []
    if (page.route) {
      pages.push(`<url><loc>https://${baseURL}/${path.join('/')}/${page.route}</loc></url>`)
    }
    if (page.subpages) {
      page.subpages.forEach((subpage) => {
        pages.push(traversePage(subpage, page.route ? [...path, page.route] : path))
      })
    }
    return pages.join('')
  }

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://${baseURL}</loc></url>
          ${meta.order
            .map((category) => {
              return category.pages
                .map((page) => {
                  const traversed = traversePage(page, [category.id])
                  return traversed
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
