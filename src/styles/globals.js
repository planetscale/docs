import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: #1A3938;
    max-width: 100vw;
  }

  a {
    color: inherit;
  }
`
