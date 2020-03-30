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
    to: 'https://planetscale.com/products',
    external: true,
  },
  {
    id: 'casestudies',
    name: 'Vitess Case Studies',
    to: 'https://planetscale.com/casestudies',
    external: true,
  },

  {
    id: 'blog',
    name: 'Blog',
    to: 'https://planetscale.com/blog',
    external: true,
  },

  {
    id: 'news',
    name: 'News',
    to: 'https://planetscale.com/newsroom',
    external: true,
  },

  {
    id: 'docs',
    name: 'Docs',
    to: '/',
  },
]

export const footerLinks = [
  {
    title: 'Company',
    data: [
      {
        id: 'blog',
        name: 'Blog',
        to: 'https://planetscale.com/blog',
        external: true,
      },
      {
        id: 'news',
        name: 'News',
        to: 'https://planetscale.com/newsroom',
        external: true,
      },
      {
        id: 'faq',
        name: 'FAQ',
        to: 'https://planetscale.com/faq',
        external: true,
      },
      {
        id: 'team',
        name: 'About Us',
        to: 'https://planetscale.com/team',
        external: true,
      },
      {
        id: 'careers',
        name: 'Careers',
        to: 'https://planetscale.com/careers',
        external: true,
      },
      {
        id: 'events',
        name: 'Events',
        to: 'https://planetscale.com/events',
        external: true,
      },
      {
        id: 'resources',
        name: 'Resources',
        to: 'https://planetscale.com/resources',
        external: true,
      },
      {
        id: 'media',
        name: 'Media Kit',
        to: 'https://planetscale.com/media',
        external: true,
      },
    ],
  },
  {
    title: 'Support',
    data: [
      {
        id: 'support',
        name: 'Submit a Ticket',
        to: 'https://planetscale.com/support',
        external: true,
      },
      {
        id: 'licenses',
        name: 'Licenses',
        to: 'https://planetscale.com/sla/201902sla/',
        external: true,
      },
      {
        id: 'terms',
        name: 'Terms of Service',
        to: 'https://planetscale.com/tos',
        external: true,
      },
      {
        id: 'privacy_policy',
        name: 'Privacy',
        to: 'https://planetscale.com/privacy',
        external: true,
      },
      {
        id: 'status',
        name: 'Status',
        to: 'https://planetscale.freshstatus.io/',
        external: true,
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
        to: 'https://vitess.io/slack',
        external: true,
      },
      {
        id: 'downloads',
        name: 'Downloads',
        to: 'https://github.com/planetscale/vitess-releases/releases',
        external: true,
      },
    ],
  },
  {
    title: 'Talk To Us',
    data: [
      {
        id: 'phone',
        name: 'Call +1-408-649-9870',
        to: 'tel:1-408-649-9870',
        external: true,
      },
      {
        id: 'contact',
        name: 'Contact Sales',
        to: 'https://planetscale.com/contact',
        external: true,
      },
    ],
  },
]
