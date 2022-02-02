import { serialize } from 'next-mdx-remote/serialize'

import Footer from '../../components/Footer'
import Layout from '../../components/layout'
import MDXContent from '../../components/MDX.Content'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags'
import { getAllPosts, getPostBySlug } from '../../lib/post'

export default function Post({ frontmatter, body, fields }) {
  const encodedTitle = encodeURI(frontmatter.title)
  return (
    <Layout>
      <TitleAndMetaTags
        title={frontmatter.title}
        description={frontmatter.subtitle ? frontmatter.subtitle : ''}
        banner={
          frontmatter.banner
            ? frontmatter.banner
            : `https://og-image.planetscale.com/${encodedTitle}.png?theme=dark&direction=row&md=1&fontSize=100px&images=https%3A%2F%2Fog-image.planetscale.com%2Fimages%2Fps-logo-white.svg`
        }
        pathname={`${fields.slug}`}
      />
      <MDXContent
        title={frontmatter.title}
        subtitle={frontmatter.subtitle ? frontmatter.subtitle : ''}
        banner={frontmatter.banner ? frontmatter.banner : ''}
        body={body}
        lastUpdatedOn={fields.lastUpdatedOn}
        slug={fields.slug}
      ></MDXContent>
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.category, params.post)
  const mdxSource = await serialize(post.content)

  return {
    props: {
      frontmatter: post.frontmatter,
      headings: post.headings,
      body: mdxSource,
      fields: {
        slug: post.slug,
        lastUpdatedOn: post.lastUpdatedOn
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          category: post.split('/')[0],
          post: post.split('/')[1].replace(/\.mdx$/, '')
        }
      }
    }),
    fallback: false
  }
}
