import React, { useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'

import Button from './Button'
import Icon from './Icon'

const CopyButton = ({ value, ariaLabel, text, variant, title, className, onCopied }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    setCopied(true)
    if (onCopied != null) {
      onCopied(true)
    }
    setTimeout(() => setCopied(false), 1500)
  }

  const buttonVariant = variant || (text ? 'primary' : 'text')

  return (
    <div className='relative inline-flex'>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <Button
          variant={buttonVariant}
          iconOnly={text ? false : true}
          className={`${className} h-[32px]`}
          ariaLabel={ariaLabel}
          title={title}
        >
          {!text && <Icon name={copied ? 'clipboard-check' : 'clipboard'} />}
          {text}
        </Button>
      </CopyToClipboard>

      <div
        className={`font-sans pointer-events-none transition absolute z-10 px-1 text-white font-semibold dark:bg-gray-50 dark:text-gray-900 text-sm transform -translate-x-1/2 bg-gray-900 rounded shadow-lg py-sm left-1/2 top-1/2 ${
          copied ? 'opacity-1 translate-y-1.5' : `opacity-0`
        }`}
      >
        Copied
      </div>
    </div>
  )
}

export default CopyButton
