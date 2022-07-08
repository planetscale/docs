import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter'

const { execSync } = require('child_process')

const postsDirectory = join(process.cwd(), 'content', 'docs')

export function getPostBySlug(category, post) {
  let fullPath = join(postsDirectory, `${category}/${post}`)
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    fullPath += '/index.mdx'
  } else {
    fullPath += '.mdx'
  }
  let fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const gitAuthorTime = execSync(`git log -1 --pretty=format:%aI ${fullPath}`).toString()

  let headings = []
  content.split('\n').forEach((str) => {
    if (str.startsWith('## ')) {
      headings.push({ depth: 2, value: str.split('## ')[1] })
    } else if (str.startsWith('### ')) {
      headings.push({ depth: 3, value: str.split('### ')[1] })
    }
  })

  return {
    category: category,
    post: post,
    slug: `${category}/${post}`,
    frontmatter: { ...data },
    lastUpdatedOn: gitAuthorTime,
    headings: headings,
    content
  }
}

export function getAllPosts() {
  let slugs = []

  fs.readdirSync(postsDirectory).forEach((file) => {
    let absolute = join(postsDirectory, file)
    if (fs.statSync(absolute).isDirectory()) {
      fs.readdirSync(absolute).forEach((subFile) => slugs.push(file.concat('/' + subFile)))
    }
  })

  return slugs
}
