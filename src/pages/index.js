import React from 'react'
import DocsOverview from '../components/Docs.Overview'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsOverview />
    </Layout>
  )
}
