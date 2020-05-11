const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const express = require('express')

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('public'))
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter.category != null
  ) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: 'slug',
      // Note: The below string manip has been done to remove trailing slashes.
      // Note: Gatsby's default plugin does not work
      value: slug.substr(0, slug.length - 1),
    })
  } else if (node.internal.type === 'File' && node.extension === 'html') {
    createNodeField({
      node,
      name: 'slug',
      value: `${node.sourceInstanceName}/api`,
    })

    createNodeField({
      node,
      name: 'title',
      value: `Operator API Reference`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark(filter: { frontmatter: { category: { ne: null } } }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }

        allFile(filter: { extension: { eq: "html" } }) {
          nodes {
            sourceInstanceName
            fields {
              slug
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMarkdownRemark.edges.forEach((edge) => {
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

      result.data.allFile.nodes.forEach((node) => {
        createPage({
          // TODO: Hack, change based on future updates
          path: node.fields.slug,
          component: path.resolve(`./src/templates/docs.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
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
