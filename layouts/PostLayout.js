import cn from 'classnames'

import FeedbackBlock from '../components/FeedbackBlock'
import Footer from '../components/Footer'
import HeadingBlock from '../components/HeadingBlock'
import Layout from '../components/layout'
import PageInfo from '../components/PageInfo'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'

export default function PostLayout({ banner, children, className, date, subtitle, title }) {
  const bannerUrl = buildBannerUrl({ banner, title })

  return (
    <Layout>
      <TitleAndMetaTags title={title} subtitle={subtitle} banner={bannerUrl} />

      <div className={cn('mdx-content', className)}>
        <HeadingBlock title={title} subtitle={subtitle} banner={banner} />

        {children}

        <FeedbackBlock />
        <PageInfo lastUpdatedOn={date} />
      </div>

      <Footer />
    </Layout>
  )
}

function buildBannerUrl({ banner, title }) {
  if (banner) {
    return `https://planetscale.com/docs${banner}`
  }

  const encodedTitle = encodeURI(title)

  return `https://og-image.planetscale.com/${encodedTitle}.png?theme=dark&direction=row&md=1&fontSize=100px&images=https%3A%2F%2Fog-image.planetscale.com%2Fimages%2Fps-logo-white-v2.svg`
}
