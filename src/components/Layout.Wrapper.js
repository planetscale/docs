import styled from 'styled-components'
import { media } from '../styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--background1);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
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
  max-width: 80rem;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 2;
  min-width: 0;
  max-width: 80ch;
  margin-top: 4em;

  ${media.phone`
    max-width: 100vw;
  `}
`
