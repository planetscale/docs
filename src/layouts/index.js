import '../utils/IE11Pollyfill'

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'

import { Header } from '../components/Layout.Header'

import { theme, pages } from '../site'
import '../fonts/'
import '../styles/globals'

export default class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { location } = this.props
    ReactGA.initialize('')
    ReactGA.pageview(location.pathname + location.search)
  }

  componentDidUpdate() {
    const { location } = this.props
    ReactGA.pageview(location.pathname + location.search)
  }

  render() {
    const { location, children, data } = this.props

    return (
      <React.Fragment>
        <Helmet>
          <link rel="icon" href="favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16.png"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Header pages={pages} location={location} />
            {children()}
          </React.Fragment>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export const query = graphql`
  query allPages {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`
