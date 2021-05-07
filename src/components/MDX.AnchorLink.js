import * as React from 'react'
import { styled } from './styles/stitches.config'
import { Links } from '@styled-icons/remix-line'

const AnchorIcon = styled('a', {
  marginLeft: '0.5em',

  '> svg': {
    width: '16px',
  },

  '&:hover': {
    border: 'unset !important',
  },
})

const AnchorHeading = styled('h2', {
  fontWeight: '600',
  fontSize: '1.563em',
  margin: '2em 0 0',

  [`& ${AnchorIcon}`]: {
    visibility: 'hidden',
    height: '1.563em',
  },

  '&:target:before': {
    content: '',
    display: 'block',
    height: '120px',
    margin: '-120px 0 0',
  },

  '&:hover': {
    [`& ${AnchorIcon}`]: {
      visibility: 'visible',
    },
  },
})

class AnchorLink extends React.Component {
  createKebabCase = (text) => {
    let kebabText = ''

    if (text && text.toLowerCase()) {
      kebabText = text
        .toLowerCase()
        .split(':')
        .join('')
        .split('.')
        .join('')
        .split('(')
        .join('')
        .split(' ')
        .join('-')
    }

    return kebabText
  }

  render() {
    const { children } = this.props

    return (
      <AnchorHeading id={`${this.createKebabCase(children)}`}>
        {children}
        <AnchorIcon href={`#${this.createKebabCase(children)}`}>
          <Links />
        </AnchorIcon>
      </AnchorHeading>
    )
  }
}

export default AnchorLink
