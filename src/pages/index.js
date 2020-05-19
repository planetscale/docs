import React, { Fragment } from 'react'
import DocsOverview from '../components/Docs.Overview'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'

export default function Overview({ data }) {
  return (
    <Fragment>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsOverview />
    </Fragment>
  )
}
