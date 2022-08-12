import { MDXProvider } from '@mdx-js/react'

import FeedbackBlock from '../components/FeedbackBlock'
import Footer from '../components/Footer'
import GetHelp from '../components/GetHelp'
import HeadingBlock from '../components/HeadingBlock'
import Layout from '../components/layout'
import AnchorLink from '../components/MDX.AnchorLink'
import CodeBlock from '../components/MDX.CodeBlock'
import ImageBlock from '../components/MDX.ImageBlock'
import InfoBlock from '../components/MDX.InfoBlock'
import InlineCodeBlock from '../components/MDX.InlineCodeBlock'
import NextBlock from '../components/MDX.NextBlock'
import TableBlock from '../components/MDX.TableBlock'
import VideoBlock from '../components/MDX.VideoBlock'
import PageInfo from '../components/PageInfo'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'

const components = {
  table: TableBlock,
  pre: CodeBlock,
  code: InlineCodeBlock,
  img: ImageBlock,
  h2: (props) => <AnchorLink {...props} heading='h2' />,
  h3: (props) => <AnchorLink {...props} heading='h3' />,
  NextBlock,
  InfoBlock,
  VideoBlock,
  GetHelp
}

export default function ConceptLayout({ children, title, subtitle, banner, slug, date }) {
  const bannerUrl = buildBannerUrl({ banner, title })

  return (
    <MDXProvider components={components}>
      <TitleAndMetaTags title={title} subtitle={subtitle} banner={bannerUrl} pathname={slug} />

      <Layout>
        <div className='mdx-content'>
          <HeadingBlock title={title} subtitle={subtitle} banner={banner} />

          {children}

          <FeedbackBlock />
          <PageInfo lastUpdatedOn={date} slug={slug}></PageInfo>
        </div>

        <Footer />
      </Layout>
    </MDXProvider>
  )
}

function buildBannerUrl({ banner, title }) {
  if (banner) {
    return `https://planetscale.com/docs${banner}`
  }

  const encodedTitle = encodeURI(title)

  return `https://og-image.planetscale.com/${encodedTitle}.png?theme=dark&direction=row&md=1&fontSize=100px&images=https%3A%2F%2Fog-image.planetscale.com%2Fimages%2Fps-logo-white-v2.svg`
}
