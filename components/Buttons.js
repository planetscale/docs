import { styled } from '../stitches.config'

export const LinkBlock = styled('a', {
  textDecoration: 'none',
  color: 'var(--text-primary)',

  '&:visited': {
    color: 'var(--text-primary)',
  },
})

export const ButtonPrimary = styled('button', {
  textDecoration: 'none',
  padding: '0.7em 1.5em',
  whiteSpace: 'nowrap',
  border: '1px solid var(--text-primary)',
  backgroundColor: 'var(--text-primary)',
  borderRadius: '6px',
  fontSize: '1em',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'var(--bg-primary)',

  '& svg': {
    width: '14px',
    marginRight: '8px',
    color: 'var(--text-secondary)',
  },

  '&:hover': {
    backgroundColor: 'var(--bg-secondary)',
  },
})

export const ButtonSecondary = styled('button', {
  textDecoration: 'unset',
  padding: '0.5em 1em',
  whitespace: 'nowrap',
  border: '1px solid var(--border-primary)',
  backgroundColor: 'var(--bg-primary)',
  borderRadius: '6px',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  flexdirection: 'row',
  alignItems: 'center',
  color: 'var(--text-primary)',

  '& svg': {
    width: '14px',
    marginRight: '8px',
    color: 'var(--text-secondary)',
  },

  '&:hover': {
    backgroundColor: 'var(--bg-secondary)',
  },
})
