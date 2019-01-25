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

export const headerLinks = [
  {
    id: 'team',
    name: 'The Team',
    to: '/team',
  },

  {
    id: 'product',
    name: 'Products',
    to: '/product',
  },

  {
    id: 'blog',
    name: 'News',
    to: '/news',
  },

  {
    id: 'careers',
    name: 'Join our Team',
    to: '/careers',
  },

  {
    id: 'contact',
    name: 'Contact',
    to: '/contact',
  },
]

export const footerLinks = [
  {
    id: 'faq',
    name: 'FAQ',
    to: '/faq',
  },

  {
    id: 'media',
    name: 'Media',
    to: '/media',
  },
]
