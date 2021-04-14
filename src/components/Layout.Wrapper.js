import styled from 'styled-components'
import { media } from './styles/media'

export const ContentBlock = styled.div`
  min-width: 0;
  flex-basis: ${(props) => (props.overview ? 'calc(765px + 300px)' : '765px')};
  padding: 0 4em;

  ${media.tablet`
    flex-basis: auto;
  `}

  ${media.phone`
    padding: 0 2em;
  `}
`
