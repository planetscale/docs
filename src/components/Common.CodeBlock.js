import * as React from 'react'
import styled from 'styled-components'

const CodeBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background1);
  color: var(--foreground2);
  border: 1px solid #282a37;
`

const CodeBlockHeader = styled.div`
  padding: 0em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background1);
`

const CodeType = styled.div`
  font-family: 'JetBrainsMono';
  color: var(--foreground2);
  font-size: 14px;
  text-transform: lowercase;
  padding: 0em 2em;
`

const CopyButton = styled.button`
  padding: 1em;
  border: 0;
  border-left: 1px solid #282a36;
  background-color: var(--background1);
  text-transform: uppercase;
  font-size: 13px;
  transition: all var(--buttonHoverDelay) ease;
  color: var(--foreground2);

  &:hover {
    background-color: var(--codeblock);
    color: white;
    cursor: pointer;
  }

  &:active {
    background-color: #e89245;
  }
`

const CodeBlockContent = styled.pre`
  padding: 2em;
  margin: 0;
  overflow: scroll;
  background-color: var(--codeblock);
`

const CodeBlockCode = styled.code`
  font-family: 'JetBrainsMono';
  font-size: 14px;
  background: var(--codeblock) !important;
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
          {codeLanguage.length > 0 && <CodeType>{codeLanguage}</CodeType>}
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
