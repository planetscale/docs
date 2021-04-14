import styled from 'styled-components'
import { media } from './styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--bg-primary);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`

export const ContentPanel = styled.div`
  flex-grow: 2;
  width: 100vw;
  display: flex;
  flex-direction: row;

  ${media.phone`
    padding: 0;
  `}
`

export const ContentContainer = styled.div`
  flex-grow: 2;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  ${media.tablet`
    align-items: stretch;
    width: 100%;
    margin: 0;
  `}
`

export const ContentBlock = styled.div`
  min-width: 0;
  flex-basis: 765px;
  padding: 0 4em;

  ${media.phone`
    padding: 0 2em;
  `}
`
