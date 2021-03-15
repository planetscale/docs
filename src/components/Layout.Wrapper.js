import styled from 'styled-components'
import { media } from '../styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--background1);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.phone`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  flex-grow: 2;
  max-width: 80rem;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 2;
  min-width: 0;
  width: 100%;
  margin-top: 4em;
  margin-bottom: 4em;

  ${media.phone`
    max-width: 100vw;
  `}
`
