const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const express = require('express')

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('public'))
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx' && node.frontmatter.title != '') {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: 'slug',
      // Note: The below string manip has been done to remove trailing slashes.
      // Note: Gatsby's default plugin does not work
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve) => {
    graphql(`
      {
        allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMdx.edges.forEach((edge) => {
        const { node } = edge
        if (node && node.fields) {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/docs.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          })
        }
      })

      resolve()
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /details-element-polyfill/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
