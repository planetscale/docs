import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${styledNormalize}

  body {
    font-family: 'Poppins', sans-serif;
    background: white;
    max-width: 100vw;
  }
  #___gatsby {
      max-width: 100vw;
      overflow-x: hidden;
      position: relative;
  }

  a {
    color: inherit;
    font-weight: 500;
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


  // TODO: remove or edit for hubspot chat integration
  .calendly-open  .crisp-client {
    display: none;
  }
`
