const slug = require('slug')
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions
    const parent = getNode(node.parent)
    if (parent.name && parent.sourceInstanceName) {
      createNodeField({
        node,
        name: 'slug',
        value: slug(parent.name),
      })

      createNodeField({
        node,
        name: 'collection',
        value: parent.name === 'noop' ? 'noop' : parent.sourceInstanceName,
      })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark(
          filter: {
            fields: {
              collection: { nin: ["faq", "team"] }
              slug: { nin: "products" }
            }
          }
        ) {
          edges {
            node {
              fields {
                slug
                collection
              }
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMarkdownRemark.edges.forEach((edge) => {
        const { node } = edge
        if (node && node.fields && node.fields.collection !== 'noop') {
          createPage({
            path: `/${node.fields.slug}`,
            component: path.resolve(
              `./src/templates/${node.fields.collection}.js`
            ),
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
