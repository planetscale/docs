import styled from 'styled-components'
import { media } from './styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--bg-primary);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  min-height: 100vh;
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
  width: 100vw;
  flex-grow: 2;
  padding: 0 4rem;

  ${media.phone`
    padding: 0 24px;
  `}
`

export const ContentConstrain = styled.div`
  margin: 4em auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100%;
  max-width: 80rem;

  ${media.tablet`
    margin: 4em auto;
  `}
`

export const ContentContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.phone`
    align-items: stretch;
    width: 100%;
    margin: 24px 0;
  `}
`

export const ContentBlock = styled.div`
  max-width: 80ch;
`
