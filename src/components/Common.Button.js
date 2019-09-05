import styled from 'styled-components'
import { media } from '../styles/media'

const buttonPadding = `
  padding: 11px 14px;
`

const bigButton = `
  font-size: 24px;
`

const clear = `
  background-color: white;
  color: black;
  border: 1px solid #eee;
  box-shadow: none;
`

const styles = `
  background: #db3d22;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  height: auto;
  letter-spacing: .025em;
  padding: 0;
  text-transform: uppercase;
  transition: all .15s ease;
  text-align: center;
  font-size: 15px;
  background-size: cover;
  & > * {
    ${buttonPadding}
  }

  &.big {
    ${bigButton}
  }

  &.clear, &.clear-color {
    ${clear}
  }

  &.transparent {
    background-color: transparent;
    border: 1px solid #fff;
  }

  ${media.largePhone`
    width: 100%;
  `}

  &:hover {
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
    transform: translateY(1px);
  }
`

export const Button = styled.div`
  ${styles} ${(props) =>
    props.backgroundImage
      ? `background-image: url(${props.backgroundImage});`
      : ''};
`

export const ButtonLink = styled.a`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #d92727;

  ${Button} & {
    color: #fff;
  }

  ${Button}.clear & {
    color: #000;
  }

  ${Button}.clear-color & {
    color: #d92727;
  }
`

export const InputButton = styled.input`
  ${styles} ${buttonPadding} ${media.largePhone`
    width: 100%;
  `};
`
