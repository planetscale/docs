import styled from 'styled-components'

export const LinkBlock = styled.a`
  text-decoration: none;
  color: var(--text-primary);

  &:visited {
    color: var(--text-primary);
  }
`

export const ButtonPrimary = styled.button`
  text-decoration: none;
  padding: 0.7em 1.5em;
  white-space: nowrap;
  border: 1px solid var(--text-primary);
  background-color: var(--text-primary);
  border-radius: 6px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--bg-primary);

  > svg {
    width: 14px;
    margin-right: 8px;
    color: var(--text-secondary);
  }

  &:hover {
    background-color: var(--bg-secondary);
  }
`

export const ButtonSecondary = styled.button`
  text-decoration: none;
  padding: 0.5em 1em;
  white-space: nowrap;
  border: 1px solid var(--border-primary);
  background-color: var(--bg-primary);
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--text-primary);

  > svg {
    width: 14px;
    margin-right: 8px;
    color: var(--text-secondary);
  }

  &:hover {
    background-color: var(--bg-secondary);
  }
`
