import React from 'react'

import Router from 'next/router'

// Track client-side page views with Segment
Router.events.on('routeChangeComplete', (url) => {
  window.analytics.page(url)
})

const Page = ({ children }) => <div>{children}</div>

export default Page
