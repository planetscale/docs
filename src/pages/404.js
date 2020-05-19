import React, { Fragment } from 'react'
import image404 from '../../static/404.png'
import styled from 'styled-components'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'

const ImagePlaceholder = styled.img`
  max-width: 150px;
`

export default function NotFoundPage({ data }) {
  return (
    <Fragment>
      <TitleAndMetaTags
        title="Page Not Found"
        pathname="404"
      ></TitleAndMetaTags>
      <ImagePlaceholder src={image404}></ImagePlaceholder>
    </Fragment>
  )
}
