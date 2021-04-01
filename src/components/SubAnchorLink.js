import * as React from 'react'
import styled from 'styled-components'

const AnchorTag = styled.a`
  color: var(--text-primary) !important;

  &:target:before {
    content: '';
    display: block;
    height: 92px;
    margin: -92px 0 0;
  }
`

class SubAnchorLink extends React.Component {
  createKebabCase = (text) => {
    let kebabText = ''

    if (text && text.toLowerCase()) {
      kebabText = text.toLowerCase()
      // .replaceAll(':', '')
      // .replaceAll('.', '')
      // .replaceAll('(', '')
      // .replaceAll(' ', '-')
    }

    return kebabText
  }

  render() {
    const { children } = this.props

    return (
      <AnchorTag
        name={`${this.createKebabCase(children)}`}
        href={`#${this.createKebabCase(children)}`}
      >
        <h2>{children}</h2>
      </AnchorTag>
    )
  }
}

export default SubAnchorLink
