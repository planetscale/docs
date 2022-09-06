import React from 'react'

import Router from 'next/router'

// Manully track client-side page views with Segment if the user is logged in
// GTM will track all page views via a page view tag
Router.events.on('routeChangeComplete', (url) => {
  if (window.analytics.user().id()) {
    window.analytics.page(url)
  }
})

const Page = ({ children }) => <div>{children}</div>

export default Page
