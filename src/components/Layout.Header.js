import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, ButtonLink } from '../components/Common.Button'
import { Wrapper } from '../components/Layout.Wrapper'
import { media } from '../styles/media'
import logo from '../../static/planetscale_logo_white_text.svg'

const _Header = styled.header`
  overflow-x: hidden;
`

const HeaderWrapper = styled(Wrapper)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 2;

  ${media.largePhone`
    padding: 1.5em;
  `}
`

const HomeLink = styled.a`
  flex-grow: 2;
  display: flex;
  text-decoration: none;
  align-items: center;
`

const Logo = styled.img`
  height: 36px;
  margin-bottom: -2px;

  ${media.largePhone`
    height: 24px;
  `}
`

const DocsBadge = styled.div`
  color: white;
  background-color: orange;
  margin-left: 16px;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 16px;
  padding: 8px;
  background-color: #347171;

  ${media.largePhone`
    font-size: 12px;
  `}
`

const MobileCloseButton = styled(Button)`
  display: none;

  ${media.largePhone`
    display: block;
    background-color: white;
    border: 1px solid;
    border-radius: 4px;
    color: black;
    box-shadow: unset;
    padding: 8px;
    font-size: 1.5em;
    color: #666;
    margin-bottom: 1em;
  `}
`

const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-end;

  ${media.largePhone`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    height: 100vh;
    width: 100vw;
    transition: all 250ms;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')} ;
    transform: translateX(${(props) => (props.visible ? '0' : '100vw')}) ;
    top: 0;
    left: 0;
    background-color: white;
    opacity: ${(props) => (props.visible ? '1' : '0')} ;
    z-index: 1337;
    padding: 2em;
  `};
`

const HeaderButton = styled(Button)`
  &:nth-child(2) {
    margin-right: 1rem;
  }

  ${media.largePhone`
    &:nth-child(2) {
      margin-right: 0;
      margin-bottom: 1rem;    
    }
  `}
`

const MobileHeaderButton = styled.button`
  background-color: transparent;
  display: none;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0;

  &:focus {
    outline: none;
  }

  ${media.desktop`
    display: block;
    border: 1px solid ${(props) =>
      props.visible ? '#000' : 'rgba(255, 255, 255, 0)'};
  `};
`

const MobileHeaderButtonIcon = styled.span`
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => (props.activeMobileMenu ? '#000' : '#fff')};
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarOpen: false,
    }
  }

  toggleSidebar = (boolean) => {
    this.setState((oldState) => {
      document.body.setAttribute(
        'data-sidebar-open',
        typeof boolean === 'boolean' ? boolean : !oldState.sideBarOpen
      )

      return {
        sideBarOpen:
          typeof boolean === 'boolean' ? boolean : !oldState.sideBarOpen,
      }
    })
  }

  render() {
    const { sideBarOpen } = this.state

    return (
      <_Header>
        <HeaderWrapper>
          <HomeLink href="/">
            <Logo
              src={logo}
              alt="PlanetScale - world's most scalable database clusters with Vitess"
            />
            <DocsBadge>Docs</DocsBadge>
          </HomeLink>
          <Nav visible={sideBarOpen}>
            <MobileCloseButton onClick={this.toggleSidebar}>
              Close
            </MobileCloseButton>
            <HeaderButton className="transparent">
              <ButtonLink href="https://www.planetscale.com">
                Go to planetscale.com
              </ButtonLink>
            </HeaderButton>
            <HeaderButton>
              <ButtonLink href="https://console.planetscale.com/signup">
                Try it for free
              </ButtonLink>
            </HeaderButton>
          </Nav>
          <MobileHeaderButton
            visible={sideBarOpen}
            onClick={this.toggleSidebar}
          >
            <MobileHeaderButtonIcon>
              <i className="fas fa-bars"></i>
            </MobileHeaderButtonIcon>
          </MobileHeaderButton>
        </HeaderWrapper>
      </_Header>
    )
  }
}

export default Header
