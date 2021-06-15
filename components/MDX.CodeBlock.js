import React, { useContext, useState, useEffect } from 'react'
import { styled } from '../stitches.config'
import { ButtonSecondary } from './Buttons'
import { CheckboxMultipleBlank, Check } from '@styled-icons/remix-line'
import { ThemeContext } from './themeContext'
import Highlight, { defaultProps } from 'prism-react-renderer'

const CodeBlockContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--border-primary)',
  borderRadius: '6px',
  margin: '3em 0',

  '> code:not(:last-of-type)': {
    borderBottom: '1px solid var(--border-primary)',
  },
})

const CopyButton = styled(ButtonSecondary, {
  fontSize: '12px',
  border: 'unset',
  backgroundColor: 'unset',
  padding: '0.75em 1em',

  '&:hover': {
    opacity: 'var(--bg-secondary)',
  },
})

const CopyButtonText = styled('span', {})

const CodeBlockHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  padding: '0.5em 0.5em 0.5em 1em',
  width: 'calc(100%)',
  borderBottom: '1px solid var(--border-primary)',
})

const CodeType = styled('div', {
  fontFamily: 'IBM Plex Mono',
  color: 'var(--gray-600)',
  fontSize: '14px',
  textTransform: 'lowercase',
  paddingRight: '0.5em',
  marginRight: '0.5em',
})

const CodeBlockContent = styled('code', {
  margin: '0',
  padding: '1em',
  overflow: 'scroll',
  fontFamily: 'IBM Plex Mono',
  fontSize: '14px',
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',

  variants: {
    command: {
      true: {
        borderRadius: '0',
      },
    },
  },
})

export default function CodeBlock({ className, children }) {
  const themeContext = useContext(ThemeContext)
  const [codeLanguage, setCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])
  const [copyButtonState, setCopyButtonState] = useState(false)
  const [customTheme, setCustomTheme] = useState(
    themeContext.getActiveMode().codeTheme
  )

  useEffect(() => {
    if (className) {
      setCodeLanguage(className.split('-')[1])
    }

    if (children.split('------').length === 2) {
      // this is a cmd + output block
      setSplitOutput(children.split('------'))
    }

    setCustomTheme(themeContext.getActiveMode().codeTheme)
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
            <CodeBlockContent command className={className} style={style}>
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
