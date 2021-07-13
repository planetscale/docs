import { ThemeProvider } from '../components/themeContext'
import { IdProvider } from '@radix-ui/react-id'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from '../components/SegmentPageTracker'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      document.body.classList.remove('prevent-scroll')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider>
      <IdProvider>
        <Head>
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
            media="print"
            onLoad="this.media='all'"
          />
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </IdProvider>
    </ThemeProvider>
  )
}
