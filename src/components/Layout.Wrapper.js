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
  padding: 4rem;
  display: flex;
  flex-direction: row;

  ${media.phone`
    padding: 0 24px;
  `}
`

export const ContentContainer = styled.div`
  flex-grow: 2;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-left: 4em;

  ${media.tablet`
    align-items: stretch;
    width: 100%;
    margin: 0;
  `}
`

export const ContentConstrain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
`

export const ContentBlock = styled.div`
  max-width: 42rem;
`
