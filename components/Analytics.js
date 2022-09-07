import React, { useEffect } from 'react'

import Router, { useRouter } from 'next/router'

import { trackIdentifiedPage } from '../lib/analytics'

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
