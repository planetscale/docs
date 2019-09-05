import { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;

  }
  to {
    opacity: 1;
  }
`

const fadeInAndRotate = keyframes`
  0% {
    transform: translateY(-1em);
  }
  100% {
    transform: translateY(0px);
  }
`
const sweep = keyframes`
  0%    {opacity: 0; margin-left: -5px; height: 0;}
  100%  {opacity: 1; margin-left: 0px; height: 100%;}
`

export const fadeInAnimation = css`
  opacity: 0;
  animation: ${fadeIn} 0.5s linear 50ms forwards;
`

export const fadeInAndRotateAnimation = css`
  opacity: 1;
  animation: ${fadeInAndRotate} 1s linear 50ms;
`

export const sweepAnimation = css`
  animation: ${sweep} 1s ease-in-out both;
`
