import * as React from 'react'
import styled from 'styled-components'
import { ButtonSecondary } from './Buttons'

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

class CodeBlock extends React.Component {
  copyCode = () => {
    const { children } = this.props.children.props
    navigator.clipboard.writeText(children)
  }

  render() {
    const { className, children } = this.props.children.props
    let codeLanguage = ''

    if (className) {
      codeLanguage = className.split('-')[1]
    }

    return (
      <CodeBlockContainer>
        <CodeBlockHeader>
          <CodeType>{codeLanguage.length > 0 ? codeLanguage : '😅'}</CodeType>
          <CopyButton onClick={this.copyCode}>Copy</CopyButton>
        </CodeBlockHeader>
        <CodeBlockContent>
          <CodeBlockCode className={codeLanguage}>{children}</CodeBlockCode>
        </CodeBlockContent>
      </CodeBlockContainer>
    )
  }
}

export default CodeBlock
