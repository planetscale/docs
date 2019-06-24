import { createGlobalStyle } from 'styled-components'

import PoppinsThin from './Poppins-Thin.ttf'
import PoppinsLight from './Poppins-Light.ttf'
import PoppinsRegular from './Poppins-Regular.ttf'
import PoppinsMedium from './Poppins-Medium.ttf'
import PoppinsBold from './Poppins-Bold.ttf'
import PoppinsBlack from './Poppins-Black.ttf'

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 100;
    src: local('Poppins Thin'), local('Poppins-Thin'), url(${PoppinsThin}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    src: local('Poppins Light'), local('Poppins-Light'), url(${PoppinsLight}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: local('Poppins'), local('Poppins-Regular'), url(${PoppinsRegular}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    src: local('Poppins Medium'), local('Poppins-Medium'), url(${PoppinsMedium}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    src: local('Poppins Bold'), local('Poppins-Bold'), url(${PoppinsBold}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 900;
    src: local('Poppins Black'), local('Poppins-Black'), url(${PoppinsBlack}) format('truetype');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  body {
    -webkit-text-size-adjust: 100%;
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-weight: 100;
    font-family: Poppins;
  }
`
