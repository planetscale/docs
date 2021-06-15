import '../styles/layout.css'
import { ThemeProvider } from '../components/themeContext'
import { IdProvider } from '@radix-ui/react-id'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
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
        <Component {...pageProps} />
      </IdProvider>
    </ThemeProvider>
  )
}

export default MyApp
