import * as React from 'react'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import DocsOverview from '../components/Docs.Overview'
import DocsNavigation from '../components/Docs.Navigation'
import { DocsSection } from '../components/Layout.Wrapper'

export default function Overview({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsSection flexDirection="row" padding="true">
        <DocsNavigation></DocsNavigation>
        <DocsOverview />
      </DocsSection>
    </Layout>
  )
}
