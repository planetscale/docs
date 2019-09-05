import styled from 'styled-components'
import { media } from '../styles/media'

export const Wrapper = styled.section`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) =>
    props.theme && props.theme.sizes && props.theme.sizes.maxWidth};
  padding: 2em 0em 2em;
  z-index: 1;

  ${media.largePhone`
    padding: 5em 1.5em 2em 1.5em;
  `};
`
