import styled from 'styled-components'
import { media } from '../styles/media'

const styles = `
  background: #db3d22;
  border-radius: 99px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  height: auto;
  letter-spacing: 3px;
  padding: 0;
  text-transform: uppercase;
  transition: all .15s ease;
  text-align: center;
  font-size: 15px;
  background-size: cover;
  padding: 14px 20px;

  ${media.phone`
    width: 100%;
  `}
`

export const Button = styled.div`
  ${styles}

  &.transparent {
    background-color: #214746;
  }
`

export const ButtonLink = styled.a`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #d92727;
  height: 20px;

  ${Button} & {
    color: #fff;
    width: 100%;
  }

  ${Button}.transparent & {
    color: white;
  }
`
