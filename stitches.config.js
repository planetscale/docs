import { createCss } from '@stitches/react'

const colorSwatches = {
  white: '#fff',
  black: '#000',

  gray050: '#fafbfc',
  gray100: '#ebeef2',
  gray200: '#d0d3d7',
  gray300: '#b2b5b9',
  gray400: '#9a9ea4',
  gray500: '#7b7f87',
  gray600: '#5a5f68',
  gray700: '#444854',
  gray800: '#30313a',
  gray900: '#1a1b21',

  red050: '#fffafa',
  red100: '#ffe5e9',
  red200: '#fbbfc7',
  red300: '#ff909f',
  red400: '#ff7082',
  red500: '#ff455d',
  red600: '#dd243c',
  red700: '#c11027',
  red800: '#8f0718',
  red900: '#51050e',

  orange050: '#fff8f3',
  orange100: '#ffe8d8',
  orange200: '#ffc59b',
  orange300: '#fc9c66',
  orange400: '#fd812d',
  orange500: '#f35815',
  orange600: '#c43c02',
  orange700: '#962d00',
  orange800: '#672002',
  orange900: '#391303',

  yellow050: '#fffbe4',
  yellow100: '#fff1a8',
  yellow200: '#fed54a',
  yellow300: '#f2b600',
  yellow400: '#d19f03',
  yellow500: '#a78103',
  yellow600: '#835c01',
  yellow700: '#5c4716',
  yellow800: '#41320c',
  yellow900: '#261c02',

  green050: '#effff3',
  green100: '#d7fbdf',
  green200: '#a9ecb8',
  green300: '#75db8c',
  green400: '#40d763',
  green500: '#27b648',
  green600: '#128e2f',
  green700: '#19652a',
  green800: '#10481d',
  green900: '#0a2912',

  blue050: '#f3fbff',
  blue100: '#ddf2ff',
  blue200: '#a9dffe',
  blue300: '#73c7f9',
  blue400: '#47b7f8',
  blue500: '#1e9de7',
  blue600: '#0e73cc',
  blue700: '#144eb6',
  blue800: '#0e3682',
  blue900: '#071f4d',

  purple050: '#f9f8ff',
  purple100: '#eeeaff',
  purple200: '#d4c9fe',
  purple300: '#b7a5fb',
  purple400: '#a18bf5',
  purple500: '#8467f3',
  purple600: '#624bbb',
  purple700: '#4b3990',
  purple800: '#3e1f75',
  purple900: '#261149',
}

export const { styled, getCssString, theme, global } = createCss({
  theme: {
    colors: {
      bgPrimary: colorSwatches.white,
      bgPrimaryTranslucent: 'rgba(255, 255, 255, 0.85)',
      bgSecondary: colorSwatches.gray050,
      bgTertiary: colorSwatches.gray100,

      borderPrimary: colorSwatches.gray100,
      borderSecondary: colorSwatches.gray200,

      textPrimary: colorSwatches.gray900,
      textSecondary: colorSwatches.gray600,
      textBlue: colorSwatches.blue600,
      textGreen: colorSwatches.green700,
      textGreenTranslucent: colorSwatches.green700.concat('10'),

      textOrange: colorSwatches.orange600,
      textOrangeTranslucent: colorSwatches.orange600.concat('10'),

      textRed: colorSwatches.red600,
      textRedDisabled: colorSwatches.red600,

      textPurple: colorSwatches.purple600,
      textPurpleTranslucent: colorSwatches.purple600.concat('10'),

      gradientFrom: colorSwatches.purple500,
      gradientTo: colorSwatches.purple700,
    },
    fonts: {
      primary: 'Inter, sans-serif',
      mono: 'IBM Plex Mono, monospace',
    },
    fontWeights: {
      1: '500',
      2: '600',
      3: '700',
    },
  },
  media: {
    tinyDesktop: '(max-width: 1400px)',
    tablet: '(max-width: 1024px)',
    phone: '(max-width: 750px)',
  },
})

export const darkTheme = theme('dark', {
  colors: {
    bgPrimary: colorSwatches.gray900,
    bgPrimaryTranslucent: 'rgba(26, 27, 32, 0.85)',
    bgSecondary: colorSwatches.gray800,
    bgTertiary: colorSwatches.gray700,

    borderPrimary: colorSwatches.gray700,
    borderSecondary: colorSwatches.gray600,

    textPrimary: colorSwatches.gray050,
    textSecondary: colorSwatches.gray300,
    textBlue: colorSwatches.blue400,
    textGreen: colorSwatches.green500,
    textGreenTranslucent: colorSwatches.green500.concat('30'),

    textOrange: colorSwatches.orange300,
    textOrangeTranslucent: colorSwatches.orange300.concat('30'),

    textRed: colorSwatches.red500,
    textRedDisabled: colorSwatches.red500,
    textPurple: colorSwatches.purple400,
    textPurpleTranslucent: colorSwatches.purple400.concat('30'),
  },
})

const globalStyles = global({
  '*': {
    boxSizing: 'border-box',
  },

  html: {
    scrollBehavior: 'smooth',
  },

  body: {
    margin: 0,
    padding: 0,
    fontFamily: '$primary',
    fontWeight: 300,
    maxWidth: '100vw',
    color: '$textPrimary',

    '::selection': {
      backgroundColor: '$textPrimary',
      color: '$bgPrimary',
    },

    '&.prevent-scroll': {
      overflow: 'hidden',
    },
  },

  '.algolia-autocomplete .ds-dropdown-menu': {
    width: '500px !important',
    borderRadius: '6px !important',
  },

  '.algolia-autocomplete .ds-dropdown-menu::before': {
    display: 'none !important',
  },

  '.ds-suggestions': {
    margin: 'unset !important',
  },

  '.algolia-autocomplete .ds-suggestion': {
    padding: '1em !important',
    background: '$bgPrimary !important',
    margin: '0 !important',
  },

  '.algolia-autocomplete .ds-suggestion.ds-cursor': {
    backgroundColor: '$bgSecondary !important',
  },

  '.algolia-autocomplete .ds-suggestion:hover': {
    backgroundColor: '$borderPrimary !important',
  },

  '.algolia-docsearch-suggestion': {
    background: 'transparent !important',
    textDecoration: 'none !important',
  },

  '.algolia-docsearch-suggestion--wrapper .algolia-docsearch-suggestion--content':
    {
      width: '100% !important',
      float: 'none !important',
      position: 'unset !important',
      backgroundColor: 'unset !important',
      padding: '4px 0 !important',
    },

  '.algolia-autocomplete .algolia-docsearch-suggestion--category-header': {
    fontWeight: '500 !important',
    fontSize: '1em !important',
    color: '$textPrimary !important',
    borderColor: '$borderPrimary !important',
  },

  '.algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column': {
    display: 'none !important',
  },

  '.algolia-autocomplete .algolia-docsearch-suggestion--subcategory-inline': {
    display: 'none !important',
  },

  '.algolia-autocomplete .algolia-docsearch-suggestion--title': {
    color: '$textPrimary !important',
    fontWeight: '300 !important',
    fontSize: '14px !important',
  },

  '.algolia-autocomplete .algolia-docsearch-suggestion--text': {
    fontSize: '14px !important',
    color: '$textPrimary !important',
  },

  '.algolia-autocomplete .algolia-docsearch-suggestion--highlight': {
    color: '$textBlue !important',
  },

  '.ds-dataset-1': {
    borderColor: '$borderPrimary !important',
    background: '$bgPrimary !important',
    padding: '0 !important',
  },

  '.algolia-docsearch-footer': {
    display: 'none !important',
  },
})

globalStyles()
