const fs = require('fs')
const matter = require('gray-matter')
const { execSync } = require('child_process')
const { join } = require('path')

const postsDirectory = join(process.cwd(), 'content', 'docs')

function getPostBySlug (category, post) {
  const filePath = getPostFilePathBySlug(category, post)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  let headings = []
  content.split('\n').forEach((str) => {
    if (str.startsWith('## ')) {
      headings.push({ depth: 2, value: str.split('## ')[1] })
    } else if (str.startsWith('### ')) {
      headings.push({ depth: 3, value: str.split('### ')[1] })
    }
  })

  const lastUpdatedOn = getPostLastUpdatedOnByFilePath(filePath)

  return {
    category: category,
    post: post,
    slug: `${category}/${post}`,
    frontmatter: { ...data },
    lastUpdatedOn: lastUpdatedOn,
    headings: headings,
    content
  }
}

function getPostFilePathBySlug(category, post) {
  let fullPath = join(postsDirectory, `${category}/${post}`)

  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    fullPath += '/index.mdx'
  } else {
    fullPath += '.mdx'
  }

  return fullPath
}

function getPostLastUpdatedOnByFilePath(filePath) {
  return execSync(`git log -1 --pretty=format:%as ${filePath}`).toString()
}

function getAllPosts() {
  let slugs = []

  fs.readdirSync(postsDirectory).forEach((file) => {
    let absolute = join(postsDirectory, file)
    if (fs.statSync(absolute).isDirectory()) {
      fs.readdirSync(absolute).forEach((subFile) => slugs.push(file.concat('/' + subFile)))
    }
  })

  return slugs
}

module.exports.getAllPosts = getAllPosts
module.exports.getPostBySlug = getPostBySlug
module.exports.getPostFilePathBySlug = getPostFilePathBySlug
module.exports.getPostLastUpdatedOnByFilePath = getPostLastUpdatedOnByFilePath
