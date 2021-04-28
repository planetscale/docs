import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'
import { CheckboxMultipleBlank, Check } from '@styled-icons/remix-line'
import { ThemeContext } from './styles/themeContext'
import Highlight, { defaultProps } from 'prism-react-renderer'

const CodeBlockContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-primary);
  border-radius: 6px;
  box-shadow: var(--tw-shadow);
  margin: 3em 0;

  > code:not(:last-of-type) {
    border-bottom: 1px solid var(--border-primary);
  }
`

const CopyButton = styled(ButtonSecondary)`
  font-size: 12px;
  border: unset;
  background-color: unset;
  padding: 0.75em 1em;

  &:hover {
    opacity: var(--bg-secondary);
  }
`

const CopyButtonText = styled.span``

const CodeBlockHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 0.5em 0.5em 0.5em 1em;
  width: calc(100%);
  border-bottom: 1px solid var(--border-primary);
`

const CodeType = styled.div`
  font-family: 'IBM Plex Mono';
  color: var(--gray-600);
  font-size: 14px;
  text-transform: lowercase;
  padding-right: 0.5em;
  margin-right: 0.5em;
`

const CodeBlockContent = styled.code`
  margin: 0;
  padding: 1em;
  overflow: scroll;
  font-family: 'IBM Plex Mono';
  font-size: 14px;
`

export default function CodeBlock({ className, children }) {
  const themeContext = useContext(ThemeContext)
  const [codeLanguage, setCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])
  const [copyButtonState, setCopyButtonState] = useState(false)
  const [customTheme, setCustomTheme] = useState(
    themeContext.getActiveDecomposedMode().codeTheme
  )

  useEffect(() => {
    if (className) {
      setCodeLanguage(className.split('-')[1])
    }

    if (children.split('------').length === 2) {
      // this is a cmd + output block
      setSplitOutput(children.split('------'))
    }

    setCustomTheme(themeContext.getActiveDecomposedMode().codeTheme)
  }, [themeContext])

  const copyCode = (e) => {
    setCopyButtonState(true)
    setTimeout(() => {
      setCopyButtonState(false)
    }, 5000)

    navigator.clipboard.writeText(
      splitOutput.length === 2 ? splitOutput[0].trim() : children
    )
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
      {splitOutput.length === 2 && (
        <Highlight
          {...defaultProps}
          theme={customTheme}
          code={splitOutput[0].trim()}
          language={codeLanguage}
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
      )}
      <Highlight
        {...defaultProps}
        theme={customTheme}
        code={
          splitOutput.length === 2 ? splitOutput[1].trim() : children.trim()
        }
        language={codeLanguage}
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
