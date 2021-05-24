const path = require('path')
const { execSync } = require('child_process')
const { createFilePath } = require(`gatsby-source-filesystem`)
const express = require('express')

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('public'))
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx' && node.frontmatter.title != '') {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const gitAuthorTime = execSync(
      `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString()

    createNodeField({
      node,
      name: 'slug',
      // Note: The below string manip has been done to remove trailing slashes.
      // Note: Gatsby's default plugin does not work
      value: node.fileAbsolutePath.includes('v1') ? '/v1' + slug : slug,
    })

    createNodeField({
      node,
      name: 'lastUpdatedOn',
      value: gitAuthorTime,
    })

    createNodeField({
      node,
      name: 'directory',
      value: node.fileAbsolutePath.includes('v1') ? 'v1' : 'docs',
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve) => {
    graphql(`
      {
        allMdx(
          filter: {
            frontmatter: { title: { ne: "" } }
            fields: { directory: { eq: "docs" } }
          }
        ) {
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

    graphql(`
      {
        allMdx(
          filter: {
            frontmatter: { title: { ne: "" } }
            fields: { directory: { eq: "v1" } }
          }
        ) {
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
            component: path.resolve(`./src/templates/docsv1.js`),
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

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typedefs = [
    `type Mdx implements Node {
      frontmatter: Frontmatter
    }`,
    `type Frontmatter @infer {
      title: String!,
      subtitle: String,
      banner: String
    }`,
  ]

  createTypes(typedefs)
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
