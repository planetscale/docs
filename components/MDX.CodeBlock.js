import React, { useContext, useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
import Icon from './Icon'

export default function CodeBlock({ className, children }) {
  const [codeLanguage, setCodeLanguage] = useState('')
  const [internalCodeLanguage, setInternalCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])
  const [copyButtonState, setCopyButtonState] = useState(false)

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
  }, [])

  const copyCode = (e) => {
    setCopyButtonState(true)
    setTimeout(() => {
      setCopyButtonState(false)
    }, 3000)

    navigator.clipboard.writeText(
      splitOutput.length === 2 ? splitOutput[0].trim() : children
    )
  }

  return (
    <div className="max-w-full border rounded mt-2 mb-4">
      <div className="flex items-center justify-between px-2 py-1 bg-secondary rounded-t border-b">
        <span className="font-sans text-secondary">{codeLanguage}</span>
        <span>
          <Icon name="clipboard" />
        </span>
      </div>
      <div className="p-2 w-full overflow-x-auto">
        {splitOutput.length === 2 && (
          <Highlight
            {...defaultProps}
            code={splitOutput[0].trim()}
            language={internalCodeLanguage}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <div>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Highlight>
        )}
        <Highlight
          {...defaultProps}
          code={
            splitOutput.length === 2 ? splitOutput[1].trim() : children.trim()
          }
          language={internalCodeLanguage}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <div>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
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
