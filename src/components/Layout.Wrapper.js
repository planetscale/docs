import styled from 'styled-components'
import { media } from '../styles/media'

export const PageContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100vw;

  ${media.phone`
    align-items: stretch;
  `}
`

export const MaxWidthBoundary = styled.section`
  max-width: 1170px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  ${media.phone`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `}
`
