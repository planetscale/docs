import { css } from 'styled-components'

const theme = {
  sizes: {
    tinydesktop: 1400,
    tablet: 1200,
    phone: 750,
  },
}

// iterate through the sizes and create a media template
export const media = Object.keys(theme.sizes).reduce((accumulator, label) => {
  const emSize = theme.sizes[label] / 16

  accumulator[label] = (...args) => css`
    @media (max-width: calc(${emSize}em)) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
