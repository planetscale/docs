import React, { useState, useEffect } from 'react'

import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'

import CopyButton from './CopyButton'

export default function CodeBlock({ children }) {
  const newChildren = children
  const realChildren = newChildren.props.children.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const [codeLanguage, setCodeLanguage] = useState('')
  const [internalCodeLanguage, setInternalCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])

  useEffect(() => {
    ;(typeof global !== 'undefined' ? global : window).Prism = Prism
    require('prismjs/components/prism-ruby.min')
    require('prismjs/components/prism-bash.min')

    if (newChildren.props.className) {
      const codeLanguage = newChildren.props.className.split('-')[1]
      if (codeLanguage === 'zsh') {
        setInternalCodeLanguage('bash')
      } else {
        setInternalCodeLanguage(codeLanguage)
      }
      setCodeLanguage(codeLanguage)
    }

    if (realChildren.split('------').length === 2) {
      // this is a cmd + output block
      setSplitOutput(realChildren.split('------'))
    }
  }, []) // eslint-disable-line

  return (
    <div className='max-w-full mt-2 mb-4 border rounded'>
      <div className='flex items-center justify-between px-2 border-b rounded-t py-sm bg-secondary'>
        <span className='font-sans text-secondary'>{codeLanguage}</span>
        <CopyButton
          value={splitOutput.length === 2 ? splitOutput[0].trim() : realChildren.trim()}
          ariaLabel={'Copy snippet'}
          title={'Copy snippet'}
        />
      </div>
      <div className='font-mono w-full p-2 overflow-x-auto'>
        {splitOutput.length === 2 && (
          <Highlight {...defaultProps} code={splitOutput[0].trim()} language={internalCodeLanguage}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <div>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Highlight>
        )}
        <Highlight
          {...defaultProps}
          code={splitOutput.length === 2 ? splitOutput[1].trim() : realChildren.trim()}
          language={internalCodeLanguage}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <div>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </Highlight>
      </div>
    </div>
  )
}
