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
  position: relative;
  display: flex;
  flex-direction: row;
  width: 900px;
  justify-content: space-between;
  align-items: flex-start;

  ${media.tinydesktop`
    width: unset;
    flex-basis: auto;
  `}

  ${media.phone`
    padding: 0 2em;
  `}
`

export const ArticleBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.overview ? 'auto' : '637px')};
  min-width: 0;
  z-index: 2;
  overflow: visible;

  ${media.tinydesktop`
    width: unset;
    flex-basis: auto;
  `}
`
