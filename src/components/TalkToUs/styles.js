import styled from 'styled-components'
import { media } from '../../styles/media'

export const DialogCloseButton = styled.button`
  background-color: transparent;
  border: none;
  user-select: none;
  cursor: pointer;
  appearance: none;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 50%;
  background-color: #222;
  ${media.largePhone`
    left: .5rem;
    top: .5rem;
    transform: scale(.75);
  `} & > span {
    font-size: 1.7rem;
    width: 2rem;
    height: 2rem;
    color: white;
  }
`

export const CalendlyWrapContent = styled.div`
  overflow-y: auto;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const CalendlyWrap = styled.div`
  transition: transform 250ms, opacity 250ms;
  position: absolute !important;
  left: 50vw;
  top: 50vh;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transform: translate(-50%, -50%)
    scale(${(props) => (props.visible ? '1, 1' : '0, 0')});
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  z-index: 1340;
  p {
    color: #222;
    font-weight: 400;
    line-height: 1.3;
  }

  .calendly-inline-widget {
    width: 100%;
    flex-grow: 1;
  }
`
