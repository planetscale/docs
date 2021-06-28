import { styled } from '../stitches.config'

export const LinkBlock = styled('a', {
  textDecoration: 'none',
  color: '$textPrimary',

  '&:visited': {
    color: '$textPrimary',
  },
})

export const ButtonSecondary = styled('button', {
  textDecoration: 'unset',
  padding: '0.5em 1em',
  whitespace: 'nowrap',
  border: '1px solid $borderPrimary',
  backgroundColor: '$bgPrimary',
  borderRadius: '6px',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  flexdirection: 'row',
  alignItems: 'center',
  color: '$textPrimary',

  '& svg': {
    width: '14px',
    marginRight: '8px',
    color: '$textSecondary',
  },

  '&:hover': {
    backgroundColor: '$bgSecondary',
  },
})
