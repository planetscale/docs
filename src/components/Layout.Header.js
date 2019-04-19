import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { injectGlobal } from 'styled-components'
import { Button } from '../components/Common.Button'
import { HeaderWrapper } from '../components/Layout.Wrapper'

import { media } from '../styles/media'

import logo from '../../static/img/logo.png'
import background from '../images/hero/home-bg.svg'

injectGlobal`
  html.fixed,
  html.fixed body {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`

const _Header = styled.header`
  width: 100%;
  z-index: 1337;
  position: absolute;

  ${media.tablet`
    width: 100%;
    margin: 0 auto;

    > [class^="LayoutWrapper"] {
      padding: 0;
    }
  `};
`
const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 10px;

  ${media.tablet`
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
    transition: all 250ms;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')} ;
    transform: translateX(${(props) => (props.visible ? '0' : '100vw')}) ;
    top: 0;
    opacity: ${(props) => (props.visible ? '1' : '0')} ;
  `};
`

const NavList = styled.ol`
  padding: 0;
  flex-grow: 2;
  text-align: center;

  ${media.tablet`
    flex-wrap: wrap;
    margin: 0 auto;
  `};
`

const NavListItem = styled.li`
  display: inline-block;
  margin: 0 1em;
  font-size: 1.15em;

  a {
    text-decoration: none;
    color: white;
    opacity: 0.5;
    font-weight: 500;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
    }
  }

  ${media.tablet`
    width: 100%;
    text-align: center;
    font-size: 2.5em;
    margin-left: 0;

    &:not(:first-child) {
      padding-top: 8vmin;
    }
  `};
`

const MobileHeaderButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  display: none;
  font-weight: 800;
  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;
  z-index: 1338;
  user-select: none;

  &:focus {
    outline: none;
  }

  ${media.tablet`
    display: inline-block;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')};
    padding-right: 1.7rem;
  `};
`

const MobileHeaderButtonLabel = styled.span`
  font-size: 1.5em;
`

const MobileHeaderButtonIcon = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
`

const Logo = styled.img`
  max-height: 40px;
  margin-bottom: -2px;

  ${media.tablet`
    display: none;
  `};
`

const MobileLogo = styled.img`
  display: none;
  max-height: 30px;
  position: ${(props) => (props.visible ? 'fixed' : 'static')};
  z-index: 1338;

  ${media.tablet`
    display: block;
  `};
`

const MobileLogoWrapper = styled(Link)`
  display: none;

  ${media.tablet`
    display: inline-block;
    padding-top: 25px;
    padding-left: 20px;
  `};
`

const RightSide = styled.div`
  ${media.desktop`
    display: none;
  `};
`

const ButtonLink = styled.a`
  text-decoration: none;
`

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarOpen: false,
      modalOpen: false,
    }
  }

  toggleSidebar = (boolean) => {
    this.setState(
      (oldState) => {
        document.body.setAttribute(
          'data-sidebar-open',
          typeof boolean === 'boolean' ? boolean : !oldState.sideBarOpen
        )

        return {
          sideBarOpen:
            typeof boolean === 'boolean' ? boolean : !oldState.sideBarOpen,
        }
      },
      () => {
        this.state.sideBarOpen
          ? document.querySelector('html').classList.add('fixed')
          : document.querySelector('html').classList.remove('fixed')
      }
    )
  }

  toggleModal = (boolean) =>
    this.setState((oldState) => {
      return {
        modalOpen: boolean,
      }
    })

  render() {
    const { location, pages } = this.props
    const { sideBarOpen, modalOpen } = this.state

    return (
      <React.Fragment>
        <_Header visible={sideBarOpen}>
          <HeaderWrapper>
            <Nav visible={sideBarOpen}>
              <Link to={'/'} activeStyle={{ opacity: 1 }}>
                <Logo src={logo} />
              </Link>
              <NavList>
                {pages.map(({ name, to }) => {
                  return (
                    <NavListItem key={to}>
                      <Link
                        onClick={() => this.toggleSidebar(false)}
                        to={`${to}`}
                        exact
                        activeStyle={{ opacity: 1 }}
                      >
                        {name}
                      </Link>
                    </NavListItem>
                  )
                })}
              </NavList>
              <RightSide>
                <Button>
                  <ButtonLink href="/signup">Sign Up</ButtonLink>{' '}
                </Button>
              </RightSide>
            </Nav>
          </HeaderWrapper>

          <MobileHeaderButton
            visible={sideBarOpen}
            onClick={this.toggleSidebar}
          >
            <MobileHeaderButtonLabel>Menu</MobileHeaderButtonLabel>
            <MobileHeaderButtonIcon>
              {sideBarOpen ? '✕' : '☰'}
            </MobileHeaderButtonIcon>
          </MobileHeaderButton>
          <MobileLogoWrapper
            to="/"
            activeStyle={{ opacity: 1 }}
            onClick={() => this.toggleSidebar(false)}
          >
            <MobileLogo src={logo} visible={sideBarOpen} />
          </MobileLogoWrapper>
        </_Header>
      </React.Fragment>
    )
  }
}
