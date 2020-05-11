import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Work Sans', sans-serif;
    max-width: 100vw;
  }

  a {
    color: inherit;
  }

  h1 {
    font-weight: 400;
    margin: 0em 0 0.5em 0;
  }
`
