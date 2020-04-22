import * as React from 'react'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import Header from '../components/Layout.Header'
import { Footer } from '../components/Layout.Footer'
import DocsOverview from '../components/Docs.Overview'
import { Hero } from '../components/Layout.Hero'

export default function Overview({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <Header />
      <Hero />
      <DocsOverview />
      <Footer />
    </Layout>
  )
}
