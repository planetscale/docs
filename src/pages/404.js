import * as React from 'react'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { DocsSection } from '../components/Layout.Wrapper'
import image404 from '../../static/404.png'
import styled from 'styled-components'

const ImagePlaceholder = styled.img`
  max-width: 150px;
`

export default function NotFoundPage({ data }) {
  return (
    <Layout>
      <TitleAndMetaTags title="Page Not Found" pathname="404" />
      <DocsSection>
        <ImagePlaceholder src={image404}></ImagePlaceholder>
      </DocsSection>
    </Layout>
  )
}
