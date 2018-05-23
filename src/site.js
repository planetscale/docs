export const theme = {
  colors: {
    base: '#EF542D',
    secondary: '#302DEF',
    tertiary: '#f3f3f3',
    highlight: '#5b8bf7',
  },
  sizes: {
    giant: 1170,
    desktop: 920,
    tablet: 700,
    largePhone: 500,
    phone: 376,
    maxWidth: '1170px',
    maxWidthCentered: '650px',
  },
}

export const sizes = theme.sizes

export const pages = [
  { name: 'Home', to: '/' },
  { name: 'Team', to: '/team' },
  { name: 'Careers', to: '/careers' },
  { name: 'Blog', to: '/blog' },
]
