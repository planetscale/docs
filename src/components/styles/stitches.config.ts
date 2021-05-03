import { createCss } from '@stitches/react'

export const { styled, css } = createCss({
  media: {
    tinyDesktop: '(max-width: 1400px)',
    tablet: '(max-width: 1200px)',
    phone: '(max-width: 750px)',
  },
})
