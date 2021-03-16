import styled from 'styled-components'

const SearchContainer = styled.div``

const SearchBoxLabel = styled.label``

const SearchBox = styled.input`
  border: 1px solid var(--border-action);
  font-size: 14px;
  border-radius: 6px;
  outline: 0;
  padding: 0.5em 1em;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  box-shadow: var(--tw-shadow);

  &:focus {
    background-color: var(--bg-primary);
    border-color: var(--text-blue);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`

export { SearchContainer, SearchBoxLabel, SearchBox }
