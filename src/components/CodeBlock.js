import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'
import { CheckboxMultipleBlank, Check } from '@styled-icons/remix-line'

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
  padding: 1em;
  margin: 0;
  overflow: scroll;
  background-color: var(--bg-primary);
  border-radius: 6px;
`

const CodeBlockCode = styled.code`
  font-family: 'IBM Plex Mono';
  font-size: 14px;
  background: var(--bg-primary) !important;
`

export default function CodeBlock(props) {
  const { className, children } = props.children.props
  const [codeLanguage, setCodeLanguage] = useState('')
  const [copyButtonState, setCopyButtonState] = useState(false)

  useEffect(() => {
    if (className) {
      setCodeLanguage(className.split('-')[1])
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
      <CodeBlockContent>
        <CodeBlockCode className={codeLanguage}>{children}</CodeBlockCode>
      </CodeBlockContent>
    </CodeBlockContainer>
  )
}
