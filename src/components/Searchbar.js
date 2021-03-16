import styled from 'styled-components'

const SearchContainer = styled.div``

const SearchBoxLabel = styled.label``

const SearchBox = styled.input`
  border: 1px solid var(--accent);
  font-size: 14px;
  border-radius: 6px;
  outline: 0;
  padding: 0.5em 1em;
  background-color: #272830;
  color: var(--text);

  &:hover {
    box-shadow: var(--shadow1);
  }

  &:focus {
    border-color: var(--foreground2);
    box-shadow: var(--shadow1);
  }

  &::placeholder {
    color: #66676f;
    font-weight: 400;
  }
`

export { SearchContainer, SearchBoxLabel, SearchBox }
