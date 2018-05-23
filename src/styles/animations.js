import styled, { keyframes } from 'styled-components'

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
    opacity: 0; 
    translate: rotate(-36deg);
  }
  1% { 
  	opacity: 1;
  }
  100% { 
    opacity: 1; 
    translate: rotate(0deg);
  }
`
const sweep = keyframes`
  0%    {opacity: 0; margin-left: -5px; height: 0;}
  100%  {opacity: 1; margin-left: 0px; height: 100%;}
`

export const fadeInAnimation = `
	opacity: 0;
	animation: ${fadeIn} 0.5s linear 50ms forwards;
`

export const fadeInAndRotateAnimation = `
	opacity: 0;
	transition: 200ms opacity;
	animation: ${fadeInAndRotate} 360s linear 50ms forwards;
`

export const sweepAnimation = `
  animation: ${sweep} 1s ease-in-out both;
`
