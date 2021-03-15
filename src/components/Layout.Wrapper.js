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
  flex-grow: 2;
  align-items: flex-start;
  max-width: 80rem;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 2;
  min-width: 0;

  ${media.phone`
    max-width: 100vw;
  `}
`
