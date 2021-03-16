import styled from 'styled-components'

const SearchContainer = styled.div``

const SearchBoxLabel = styled.label``

const SearchBox = styled.input`
  border: 1px solid var(--border-primary);
  font-size: 14px;
  border-radius: 6px;
  outline: 0;
  padding: 0.5em 1em;
  background-color: #272830;
  color: var(--text-primary);

  &:focus {
    border-color: var(--text-blue);
  }

  &::placeholder {
    color: var(--text-secondary);
    font-weight: 400;
  }
`

export { SearchContainer, SearchBoxLabel, SearchBox }
