import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Button, ButtonLink } from '../components/Common.Button'
import { Wrapper } from '../components/Layout.Wrapper'
import { media } from '../styles/media'
import logo from '../../static/img/logo.png'

const HeaderWrapper = styled(Wrapper)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const _Header = styled.header`
  width: 100%;
  z-index: 1337;

  ${media.desktop`
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
  border: none;
  box-sizing: border-box;
  color: white;
  display: none;
  font-weight: 500;
  position: absolute;
  top: 25px;
  right: 20px;
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
    display: inline-block;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')};
    border: 1px solid;
    border-color: ${(props) =>
      props.visible ? '#000' : 'rgba(255, 255, 255, 0.8)'};
  `};
`

const MobileHeaderButtonIcon = styled.span`
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => (props.activeMobileMenu ? '#000' : '#fff')};
`

const Logo = styled.img`
  max-height: 40px;
  margin-bottom: -2px;

  ${media.desktop`
    display: none;
  `};
`

const MobileLogo = styled.img`
  display: none;
  max-height: 30px;
  position: ${(props) => (props.visible ? 'fixed' : 'static')};

  ${media.desktop`
    display: block;
  `};
`

const MobileLogoWrapper = styled(Link)`
  display: none;

  ${media.desktop`
    display: inline-block;
    padding-top: 25px;
    padding-left: 20px;
  `};
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
        this.checkFixedPage()
      }
    )
  }

  render() {
    const { pages } = this.props
    const { sideBarOpen } = this.state

    return (
      <_Header visible={sideBarOpen}>
        <HeaderWrapper>
          <Nav visible={sideBarOpen}>
            <Link to={'https://planetscale.com'} activeStyle={{ opacity: 1 }}>
              <Logo
                src={logo}
                alt="PlanetScale - world's most scalable database clusters with Vitess"
              />
            </Link>
            <NavList>
              {pages.map(({ name, to }) => {
                return (
                  <NavListItem key={to}>
                    <Link
                      onClick={() => this.toggleSidebar(false)}
                      to={`${to}`}
                      exact="true"
                      activeStyle={{
                        borderBottom: '4px solid rgb(255, 255, 255)',
                      }}
                    >
                      {name}
                    </Link>
                  </NavListItem>
                )
              })}
            </NavList>
            <RightSide>
              <Button>
                <ButtonLink href="https://console.planetscale.com/signup">
                  Get Started
                </ButtonLink>{' '}
              </Button>
            </RightSide>
          </Nav>
        </HeaderWrapper>

        <MobileHeaderButton visible={sideBarOpen} onClick={this.toggleSidebar}>
          <MobileHeaderButtonIcon activeMobileMenu={this.state.sideBarOpen}>
            {sideBarOpen ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
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
    )
  }
}

export default Header
