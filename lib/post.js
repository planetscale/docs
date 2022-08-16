const fs = require('fs')
const { join } = require('path')

const matter = require('gray-matter')

const postsDirectory = join(process.cwd(), 'pages')

function getPostBySlug(category, post) {
  const filePath = getPostFilePathBySlug(category, post)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const {
    data: { date, ...frontmatter },
    content
  } = matter(fileContents)

  return {
    category: category,
    post: post,
    slug: `${category}/${post}`,
    frontmatter: frontmatter,
    lastUpdatedOn: date,
    content
  }
}

function getPostFilePathBySlug(category, post) {
  let fullPath = join(postsDirectory, `${category}/${post}`)

  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory() && fs.existsSync(fullPath + '/index.mdx')) {
    fullPath += '/index.mdx'
  } else {
    fullPath += '.mdx'
  }

  return fullPath
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
