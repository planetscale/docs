import React from 'react'

import SVG from 'react-inlinesvg'

const Icon = ({ name, size, scale = 1, className }) => {
  const file = size ? `${name}-${size}` : name
  let renderedSize = 16

  if (size === 'large') {
    renderedSize = 24
  } else if (size === 'xl') {
    renderedSize = 32
  }

  if (scale > 1) {
    renderedSize *= scale
  }

  return (
    <SVG
      src={`/icons/${file}.svg`}
      width={renderedSize}
      height={renderedSize}
      className={`flex-shrink-0 ${className}`}
    />
  )
}

export default Icon
