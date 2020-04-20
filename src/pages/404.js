import * as React from 'react'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import Header from '../components/Layout.Header'
import { Footer } from '../components/Layout.Footer'

export default function NotFoundPage({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags title="Page Not Found" pathname="404" />
      <Header />
      <Footer />
    </Layout>
  )
}
