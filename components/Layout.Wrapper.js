import { styled } from '../stitches.config'

export const PageContainer = styled('div', {
  flexBasis: 'calc(745px + 215px)',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '4em',

  '@tinyDesktop': {
    padding: '0 4em',
  },

  '@phone': {
    padding: '0',
    flexGrow: '2',
  },
})

export const ContentBlock = styled('div', {
  flexGrow: '2',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  width: '880px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  '@tinyDesktop': {
    width: 'unset',
    flexBasis: 'auto',
  },

  '@phone': {
    padding: '0 2em',
  },
})

export const ArticleBlock = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '0',
  width: '617px',
  zIndex: '2',
  overflow: 'visible',

  variants: {
    overview: {
      true: {
        width: 'auto',
      },
    },
  },

  '@tinyDesktop': {
    width: 'unset',
    flexBasis: 'auto',
  },
})
