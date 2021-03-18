import styled from 'styled-components'

export const ButtonSecondary = styled.div`
  text-decoration: none;
  padding: 0.5em 1.5em;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border: 1px solid var(--border-primary);
  background-color: var(--bg-primary);
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-secondary);
  }
`