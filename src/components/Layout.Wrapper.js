import styled from 'styled-components'
import { media } from '../styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: var(--background1);
  transition: background-color var(--themeSwitchTime) ease;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;

  ${media.phone`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 75vw;
  min-width: 0;

  ${media.phone`
    max-width: 100vw;
  `}
`
