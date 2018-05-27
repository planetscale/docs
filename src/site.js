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
  {
    id: 'home',
    name: 'Home',
    to: '/',
  },
  {
    id: 'team',
    name: 'Team',
    to: '/team',
  },
  {
    id: 'careers',
    name: 'Careers',
    to: '/careers',
  },
  // Uncomment this to re-enable the blog
  // {
  //   id: 'blog',
  //   name: 'Blog',
  //   to: '/blog',
  // },
]
