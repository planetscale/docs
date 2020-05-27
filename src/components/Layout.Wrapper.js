import styled from 'styled-components'
import { media } from '../styles/media'

export const PageContainer = styled.section`
  position: relative;
  background-color: #fff;
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

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75vw;
  min-width: 0;

  ${media.phone`
    width: 100vw;
  `}
`

export const IFrameContainer = styled.iframe`
  width: 100%;
  height: 100%;
  flex-grow: 2;
  border: 0;
`
