import styled from 'styled-components'
import { media } from './styles/media'

export const PageContainer = styled.div`
  flex-basis: calc(765px + 215px);
  display: flex;
  flex-direction: column;
  padding-left: 4em;
  box-shadow: var(--page-shadow);

  ${media.tinydesktop`
  padding: 0 4em;
  `}

  ${media.phone`
    padding: 0;
  `}
`

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-width: 0;
  flex-basis: calc(685px + 215px);
  justify-content: space-between;
  align-items: flex-start;

  ${media.tinydesktop`
    flex-basis: auto;
  `}

  ${media.phone`
    padding: 0 2em;
  `}
`

export const ArticleBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: ${(props) => (props.overview ? 'auto' : '637px')};
  min-width: 0;

  ${media.tinydesktop`
    flex-basis: auto;
  `}
`
