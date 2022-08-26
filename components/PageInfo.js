import React from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

function PageInfo({ lastUpdatedOn, router }) {
  var lastUpdatedOnDate = new Date()
  if (lastUpdatedOn) {
    lastUpdatedOnDate = new Date(Date.parse(lastUpdatedOn))
  }

  const options = { month: 'long' }
  const url = `https://github.com/planetscale/docs/blob/main/pages${router.asPath}.mdx`

  return (
    <div className='flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b mb-4'>
      <div className='text-secondary mb-1 sm:mb-0'>
        Last updated on {new Intl.DateTimeFormat('en-US', options).format(lastUpdatedOnDate)}{' '}
        {lastUpdatedOnDate.getDate()}, {lastUpdatedOnDate.getFullYear()}
      </div>

      <Link href={url}>
        <a>Help us improve this page</a>
      </Link>
    </div>
  )
}

export default withRouter(PageInfo)
