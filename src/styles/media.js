import { css } from 'styled-components'
import { sizes } from '../site.js'

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16

  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
