import React from 'react'
import DocsOverview from '../../components/V1.Overview'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags'
import LayoutV1 from '../../components/layout_v1'

export default function Home() {
  return (
    <LayoutV1>
      <TitleAndMetaTags title="Overview" pathname="overview" />
      <DocsOverview />
    </LayoutV1>
  )
}
