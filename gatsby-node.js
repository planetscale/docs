const slug = require(`slug`);
const path = require(`path`);
// Implement the Gatsby API `createPages`. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
// exports.createPages = ({ boundActionCreators }) => {
// 	// We need `createRedirect` action in `boundActionCreators` collection
// 	// to make the redirection magic happen.
// 	// https://www.gatsbyjs.org/docs/bound-action-creators/
// 	const { createRedirect } = boundActionCreators;

// 	// create the one-off redirect
// 	// https://www.gatsbyjs.org/docs/bound-action-creators/#createRedirect
// 	// createRedirect({
// 	// 	fromPath: '/stockists',
// 	// 	isPermanent: true,
// 	// 	redirectInBrowser: true,
// 	// 	toPath: '/shops'
// 	// });
// };


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField, deleteNode } = boundActionCreators;
    const parent = getNode(node.parent);

    createNodeField({
      node,
      name: `slug`,
      value: slug(parent.name),
    });
    createNodeField({
      node,
      name: `collection`,
      value: parent.name === 'noop' ? 'noop' : parent.sourceInstanceName,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
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
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach((edge) => {
        const { node } = edge;
        if (node.fields.collection !== 'noop') {
          createPage({
            path: `${node.fields.collection}/${node.fields.slug}`,
            component: path.resolve(`./src/templates/${node.fields.collection}.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          });
        }
      });
      resolve()
    })
  })
};