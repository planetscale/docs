import * as React from 'react'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import DocsOverview from '../components/Docs.Overview'
import { DocsSection } from '../components/Layout.Wrapper'

export default function Overview({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsSection>
        <DocsOverview />
      </DocsSection>
    </Layout>
  )
}
