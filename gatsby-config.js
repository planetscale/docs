module.exports = {
	siteMetadata: {
		title: 'Dona Rita'
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: '#ffffff',
				showSpinner: false
			}
		},
    'gatsby-plugin-styled-components',
		'gatsby-transformer-json',
		'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `careers`,
        path: `${__dirname}/content/careers/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `team`,
        path: `${__dirname}/content/team/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `investors`,
        path: `${__dirname}/content/investors/`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-greenhouse',
      options: {
        apiToken: 'fde04402b62d4e24777f64abf9056cd2-2',
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify' 
	]
};
