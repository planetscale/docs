import React from 'react'
import { styled } from '../stitches.config'

export const Hyperlink = styled('a', {
  color: '$textBlue',
  textDecoration: 'none',
  borderBottom: '1px solid transparent',
  transition: 'border-bottom 0.25s ease',

  '&:hover': {
    borderBottom: '1px solid $textBlue',
    backgroundColor: '$textBlueTranslucent',
  },

  variants: {
    type: {
      primary: {
        fontSize: '1em',
      },
      secondary: {
        fontSize: '12px',
      },
      embed: {
        borderBottom: 'unset',
        '&:hover': {
          borderBottom: 'unset',
          backgroundColor: 'unset',
        },
      },
    },
  },

  defaultVariants: {
    type: 'primary',
  },
})

export function MDXHyperlinkHelper({ type, href, children }) {
  return <Hyperlink type={type} href={href}>{children}</Hyperlink>
}
