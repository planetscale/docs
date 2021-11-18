import React, { useState, useEffect } from 'react'

import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'

import CopyButton from './CopyButton'

export default function CodeBlock({ className, children }) {
  const [codeLanguage, setCodeLanguage] = useState('')
  const [internalCodeLanguage, setInternalCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])

  useEffect(() => {
    ;(typeof global !== 'undefined' ? global : window).Prism = Prism
    require('prismjs/components/prism-ruby.min')
    require('prismjs/components/prism-bash.min')

    if (className) {
      const codeLanguage = className.split('-')[1]
      if (codeLanguage === 'zsh') {
        setInternalCodeLanguage('bash')
      } else {
        setInternalCodeLanguage(codeLanguage)
      }
      setCodeLanguage(codeLanguage)
    }

    if (children.split('------').length === 2) {
      // this is a cmd + output block
      setSplitOutput(children.split('------'))
    }
  }, []) // eslint-disable-line

  return (
    <div className='max-w-full mt-2 mb-4 border rounded'>
      <div className='flex items-center justify-between px-2 border-b rounded-t py-sm bg-secondary'>
        <span className='font-sans text-secondary'>{codeLanguage}</span>
        <CopyButton
          value={splitOutput.length === 2 ? splitOutput[0].trim() : children.trim()}
          ariaLabel={'Copy snippet'}
          title={'Copy snippet'}
        />
      </div>
      <div className='w-full p-2 overflow-x-auto'>
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
          code={splitOutput.length === 2 ? splitOutput[1].trim() : children.trim()}
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
