import * as React from 'react'

import classNames from 'classnames'

// import Footer from './Footer'

class AnchorLink extends React.Component {
  createKebabCase(text) {
    let kebabText = ''

    if (text && text.toLowerCase) {
      kebabText = text.toLowerCase().split(':').join('').split('.').join('').split('(').join('').split(' ').join('-')
    }

    return kebabText
  }

  render() {
    const { children, heading, category } = this.props

    return category !== 'api' ? (
      <a className='text-primary' href={`#${this.createKebabCase(children)}`}>
        <h1
          className={classNames('font-semibold', {
            'text-2l mb-3 mt-4': heading === 'h1',
            'text-xl mb-2 mt-3': heading === 'h2',
            'text-lg mb-2 mt-3': heading === 'h3',
            'text-base mb-1 mt-2': heading === 'h4' || heading === 'h5',
            'text-sm mb-1 mt-2': heading === 'h6'
          })}
          as={heading}
          id={`${this.createKebabCase(children)}`}
        >
          {children}
        </h1>
      </a>
    ) : (
      <h1
        className={classNames('font-semibold', {
          'text-2l mb-3 mt-4': heading === 'h1',
          'text-xl mb-2 mt-3': heading === 'h2',
          'text-lg mb-2 mt-3': heading === 'h3',
          'text-base mb-1 mt-2': heading === 'h4' || heading === 'h5',
          'text-sm mb-1 mt-2': heading === 'h6'
        })}
        as={heading}
      >
        {children}
      </h1>
    )
  }
}

export default AnchorLink
