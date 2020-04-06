import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Button, ButtonLink } from '../components/Common.Button'
import { Wrapper } from '../components/Layout.Wrapper'
import { media } from '../styles/media'
import logo from '../../static/planetscale_logo_white_text.svg'

const _Header = styled.header`
  width: 100%;
  z-index: 1337;

  ${media.desktop`
    width: 100%;
    margin: 0 auto;
  `};
`

const HeaderWrapper = styled(Wrapper)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.largePhone`
    padding: 1.5em;
  `}
`

const HomeLink = styled(Link)`
  flex-grow: 2;
`

const Logo = styled.img`
  height: 40px;
  margin-bottom: -2px;

  ${media.largePhone`
    height: 24px;
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
  justify-content: flex-start;

  ${media.desktop`
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    transition: all 250ms;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')} ;
    transform: translateX(${(props) => (props.visible ? '0' : '100vw')}) ;
    top: 0;
    background-color: white;
    opacity: ${(props) => (props.visible ? '1' : '0')} ;
    z-index: 1337;
  `};
`

const NavList = styled.ol`
  padding: 0;
  flex-grow: 2;
  text-align: right;
  margin-right: 1em;

  ${media.desktop`
    flex-wrap: wrap;
    margin: 0 auto;
    order: 2;
    flex-grow: 0;
  `};
`

const NavListItem = styled.li`
  display: inline-block;
  margin: 0 0.5em;
  font-size: 1em;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      border-bottom: 4px solid #fff;
    }
  }

  ${media.desktop`
    width: 100%;
    text-align: center;
    font-size: 1.75em;
    margin-left: 0;

    a {
      color: #000;
      &:hover {
        border-bottom: 4px solid #fff;
      }
    }

    &:not(:first-child) {
      padding-top: 5vmin;
    }
  `};
`

const MobileHeaderButton = styled.button`
  background-color: transparent;
  display: none;
  cursor: pointer;
  z-index: 1338;
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

const RightSide = styled.div`
  button {
    margin-left: 0.5em;
  }

  ${media.desktop`
    margin-bottom: 2rem;
  `};
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
    const { pages } = this.props
    const { sideBarOpen } = this.state

    return (
      <_Header visible={sideBarOpen}>
        <HeaderWrapper>
          <HomeLink href="https://planetscale.com">
            <Logo
              src={logo}
              alt="PlanetScale - world's most scalable database clusters with Vitess"
            />
          </HomeLink>
          <Nav visible={sideBarOpen}>
            <NavList>
              {pages.map(({ name, to, external }) => {
                return (
                  <NavListItem key={to}>
                    {external && external === true ? (
                      <a href={to}>{name}</a>
                    ) : (
                      <Link
                        to={to}
                        exact="true"
                        activeStyle={{
                          borderBottom: '4px solid rgb(255, 255, 255)',
                        }}
                      >
                        {name}
                      </Link>
                    )}
                  </NavListItem>
                )
              })}
            </NavList>
            <RightSide>
              <Button>
                <ButtonLink href="https://console.planetscale.com/signup">
                  Try it for free
                </ButtonLink>{' '}
              </Button>
            </RightSide>
          </Nav>
          <MobileHeaderButton
            visible={sideBarOpen}
            onClick={this.toggleSidebar}
          >
            <MobileHeaderButtonIcon activeMobileMenu={this.state.sideBarOpen}>
              {sideBarOpen ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </MobileHeaderButtonIcon>
          </MobileHeaderButton>
        </HeaderWrapper>
      </_Header>
    )
  }
}

export default Header
