import styled from 'styled-components'

export const LinkBlock = styled.a`
  text-decoration: none;
  color: var(--text-primary);

  &:visited {
    color: var(--text-primary);
  }
`

export const ButtonSecondary = styled.div`
  text-decoration: none;
  padding: 0.5em 1.5em;
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
