import styled from 'styled-components'

import { media } from '../styles/media'

const HeadingCommons = `
  display: block;
  width: 100%;
`

export const H1 = styled.h1`
  ${HeadingCommons}

  text-align: ${(props) => (props.align ? props.align : 'center')};
  font-size: 3.5em;
  font-weight: ${(props) => (props.bold ? '500' : '100')};

  ${media.largePhone`
    font-size: 2em;
  `}

  a { font-weight 300; }
`

export const H2 = styled.h2`
  ${HeadingCommons} font-size: 2.5em;
  font-weight: ${(props) => (props.bold ? '400' : '100')};
  margin: 0;

  ${media.largePhone`
    font-size: 2em;
  `};
`

export const H3 = styled.h3`
  ${HeadingCommons} font-size: 2em;
  font-weight: ${(props) => (props.bold ? '400' : '100')};
  margin: 0;

  ${media.largePhone`
    font-size: 2em;
  `};
`

export const H5 = styled.h5`
  ${HeadingCommons} font-size: 1.2em;
  font-weight: 500;
  margin: 0;

  ${media.largePhone`
  font-size: 1.2em;
`};
`
