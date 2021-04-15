import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'
import { CheckboxMultipleBlank, Check } from '@styled-icons/remix-line'

import Highlight, { defaultProps } from 'prism-react-renderer'
import codeBlockThemeLight from 'prism-react-renderer/themes/vsLight'
import exoDark from './styles/exoDark'

const CodeBlockContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  box-shadow: var(--tw-shadow);
  margin: 3em 0;
`

const CopyButton = styled(ButtonSecondary)`
  font-size: 12px;
`

const CopyButtonText = styled.span``

const CodeBlockHeader = styled.div`
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`

const CodeType = styled.div`
  font-family: 'IBM Plex Mono';
  color: var(--text-secondary);
  font-size: 14px;
  text-transform: lowercase;
`

const CodeBlockContent = styled.pre`
  padding: 1em 1em 0;
  margin: 0;
  overflow: scroll;
  font-family: 'IBM Plex Mono';
  font-size: 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`

export default function CodeBlock(props) {
  const { className, children } = props.children.props
  const [codeLanguage, setCodeLanguage] = useState('')
  const [copyButtonState, setCopyButtonState] = useState(false)
  const [customTheme, setCustomTheme] = useState(exoDark)

  useEffect(() => {
    const root = document.querySelector('html')

    if (className) {
      setCodeLanguage(className.split('-')[1])
    }

    if (root.classList.contains('dark')) {
      setCustomTheme(exoDark)
    } else {
      setCustomTheme(codeBlockThemeLight)
    }
  })

  const copyCode = (e) => {
    setCopyButtonState(true)
    setTimeout(() => {
      setCopyButtonState(false)
    }, 5000)
    navigator.clipboard.writeText(children)
  }

  return (
    <CodeBlockContainer>
      <CodeBlockHeader>
        <CodeType>{codeLanguage}</CodeType>
        <CopyButton onClick={copyCode}>
          {copyButtonState ? <Check /> : <CheckboxMultipleBlank />}
          <CopyButtonText>
            {copyButtonState ? 'Copied!' : 'Copy'}
          </CopyButtonText>
        </CopyButton>
      </CodeBlockHeader>
      <Highlight
        {...defaultProps}
        theme={customTheme}
        code={children}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <CodeBlockContent className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </CodeBlockContent>
        )}
      </Highlight>
    </CodeBlockContainer>
  )
}
