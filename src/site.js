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
    id: 'products',
    name: 'Products',
    to: '/products',
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
]

export const footerLinks = [
  {
    title: 'Company',
    data: [
      {
        id: 'news',
        name: 'News',
        to: '/news',
      },
      {
        id: 'faq',
        name: 'FAQ',
        to: '/faq',
      },
      {
        id: 'team',
        name: 'About Us',
        to: '/team',
      },
      {
        id: 'careers',
        name: 'Careers',
        to: '/careers',
      },
      {
        id: 'media',
        name: 'Media Kit',
        to: '/media',
      },
    ],
  },
  {
    title: 'Support',
    data: [
      {
        id: 'support',
        name: 'Submit a Ticket',
        to: '/support',
        external: true,
      },
      {
        id: 'licenses',
        name: 'Licenses',
        to: '/sla/201902sla/',
        external: true,
      },
      {
        id: 'terms',
        name: 'Terms of Service',
        to: '/tos',
      },
      {
        id: 'privacy_policy',
        name: 'Privacy',
        to: '/privacy',
      },
    ],
  },
  {
    title: 'Open Source',
    data: [
      {
        id: 'vitess',
        name: 'Vitess',
        to: 'https://vitess.io',
        external: true,
      },
      {
        id: 'community',
        name: 'Community',
        to: 'https://vitess.slack.com',
        external: true,
      },
    ],
  },
  {
    title: 'Talk To Us',
    data: [
      {
        id: 'phone',
        name: 'Call +1-669-237-1085',
        to: 'tel:1-669-237-1085',
        external: true,
      },
      {
        id: 'contact',
        name: 'Contact Sales',
        to: '/contact',
      },
    ],
  },
]
