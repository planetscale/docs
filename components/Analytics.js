import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

Router.events.on('routeChangeComplete', (url) => {
  trackIdentifiedPage(url)
})

const Analytics = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    trackIdentifiedPage(`${router.basePath}${router.asPath}`)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div>{children}</div>
}

export default Analytics

function trackIdentifiedPage(url) {
  if (window && window.analytics && typeof Cookies.get('signed_in') !== 'undefined') {
    window.analytics.page(url)
  }
}
