import * as React from 'react'

import classNames from 'classnames'
import kebabcase from 'lodash.kebabcase'

class AnchorLink extends React.Component {
  render() {
    const { children, heading } = this.props

    const id = getIdFromChildren(children)

    return (
      <a className='text-primary' href={`#${id}`}>
        <h1
          className={classNames('font-semibold', {
            'text-2l mb-3 mt-4': heading === 'h1',
            'text-xl mb-2 mt-3': heading === 'h2',
            'text-lg mb-2 mt-3': heading === 'h3',
            'text-base mb-1 mt-2': heading === 'h4' || heading === 'h5',
            'text-sm mb-1 mt-2': heading === 'h6'
          })}
          as={heading}
          id={id}
        >
          {children}
        </h1>
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
