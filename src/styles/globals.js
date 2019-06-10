import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { media } from './media'

injectGlobal`
  ${styledNormalize}

  body {
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

  .Typist {
  	display: inline;
  	padding-left: 7px;
  	font-weight: 1000;
  }
  details summary::-webkit-details-marker { display:none; }
  details > summary:first-of-type {
    list-style-type: none;
  }
  .rodal-close:before, .rodal-close:after {
    background: white !important;
  }

  .calendly-open  .crisp-client {
    display: none;
  }
`
