import * as React from 'react'

import cn from 'classnames'
import kebabcase from 'lodash.kebabcase'

class AnchorLink extends React.Component {
  render() {
    const { children, heading: Heading } = this.props

    const id = getIdFromChildren(children)

    return (
      <a className='text-primary' href={`#${id}`}>
        <Heading
          className={cn('font-semibold', {
            'text-2l mb-3 mt-4': Heading === 'h1',
            'text-xl mb-2 mt-3': Heading === 'h2',
            'text-lg mb-2 mt-3': Heading === 'h3',
            'text-base mb-1 mt-2': Heading === 'h4' || Heading === 'h5',
            'text-sm mb-1 mt-2': Heading === 'h6'
          })}
          id={id}
        >
          {children}
        </Heading>
      </a>
    )
  }
}

const getIdFromChildren = (children) => {
  let label = ''

  React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      label += getIdFromChildren(child.props.children)
    }

    if (typeof child === 'string') {
      label += child
    }
  })

  return kebabcase(label)
}

export default AnchorLink
