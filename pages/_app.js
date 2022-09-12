import '../styles/index.css'
import { useEffect, useState } from 'react'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Analytics from '../components/Analytics'
import { MDXProvider, components } from '../components/MDX'

export function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      document.body.classList.remove('prevent-scroll')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []) // eslint-disable-line

  const [favicon, setFavicon] = useState('/docs/favicon_system.svg')

  useEffect(() => {
    const onChange = (event) => {
      setFavicon(`/docs/favicon_${event.matches ? 'dark' : 'light'}.svg`)
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    if (query.addEventListener) {
      query.addEventListener('change', onChange)
    }
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const path = window.location.hash
    if (path && path.includes('#')) {
      setTimeout(() => {
        const scrolled = document.documentElement.scrollTop !== 0
        if (scrolled) return

        const id = path.replace('#', '')
        const el = window.document.getElementById(id)
        if (!el) return

        const r = el.getBoundingClientRect()
        window.top.scroll({
          top: scrollY + r.top - 100, // 100 for page header height
          behavior: 'smooth'
        })
      }, 600)
    }
  }, [])

  return (
    <ThemeProvider defaultTheme='system' attribute='class'>
      <MDXProvider components={components}>
        <Head>
          <link rel='icon' href='/docs/favicon.ico' sizes='any' />
          <link rel='icon' href={favicon} sizes='any' type='image/svg+xml' />
          <link rel='apple-touch-icon' href='/docs/apple-touch-icon.png' />
          <link rel='manifest' href='/docs/manifest.webmanifest' />
        </Head>

        <Analytics>
          <Component {...pageProps} />
        </Analytics>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
