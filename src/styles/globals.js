import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  body {
    font-family: 'Poppins', sans-serif;
    background: #1A3938;
    max-width: 100vw;
  }
  #___gatsby {
      max-width: 100vw;
      overflow-x: hidden;
      position: relative;
  }

  a {
    color: inherit;
    
    & > div {
      display: inline-block !important;
      padding: 11px 14px !important;
    }
    [class^='CommonButton__Button'] {
      padding: 11px 14px !important;
    }
  }

  details summary::-webkit-details-marker { display:none; }
  details > summary:first-of-type {
    list-style-type: none;
  }

  :root {
    --exo-font-size-oversize: 4.768em;
    --exo-font-size-h1: 3.815em;
    --exo-font-size-h2: 3.052em;
    --exo-font-size-h3: 2.441em;
    --exo-font-size-h4: 1.953em;
    --exo-font-size-h5: 1.563em;
    --exo-font-size-h6: 1.25em;
    --exo-font-size-body: 1em;
    --exo-font-size-pre-title: 17px;
  }
`
