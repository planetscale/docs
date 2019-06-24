import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { createGlobalStyle } from 'styled-components'
import { Button, NativeButton } from '../components/Common.Button'
import { HeaderWrapper } from '../components/Layout.Wrapper'
import { StaticQuery, graphql } from 'gatsby'

import { media } from '../styles/media'

import TalkDrawer from './TalkToUs/Main'

import logo from '../../static/img/logo.png'
import background from '../images/hero/home-bg.svg'

const GlobalStyle = createGlobalStyle`
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
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: flex-start;

  ${media.desktop`
    flex-direction: column;
    justify-content: center;
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

  ${media.desktop`
    flex-wrap: wrap;
    margin: 0 auto;
    order: 2;
    flex-grow: 0;
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

  ${media.desktop`
    width: 100%;
    text-align: center;
    font-size: 2.2em;
    margin-left: 0;

    &:not(:first-child) {
      padding-top: 5vmin;
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

  ${media.desktop`
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

  ${media.desktop`
    display: none;
  `};
`

const MobileLogo = styled.img`
  display: none;
  max-height: 30px;
  position: ${(props) => (props.visible ? 'fixed' : 'static')};
  z-index: 1338;

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

const ButtonLink = styled.a`
  text-decoration: none;
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarOpen: false,
      modalOpen: false,
      talkDrawerOpen: false,
    }

    this.handleTalkClick = this.handleTalkClick.bind(this)
    this.checkFixedPage = this.checkFixedPage.bind(this)
    this.escHandler = this.escHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escHandler, false)
  }

  escHandler(event) {
    if (event.keyCode === 27) {
      const html = document.querySelector('html')
      if (html.classList) {
        if (html.classList.contains('calendly-open')) {
          this.handleTalkClick()
        } else if (html.classList.contains('fixed')) {
          this.toggleSidebar(false)
        }
      }
    }
  }

  checkFixedPage() {
    this.state.sideBarOpen
      ? document.querySelector('html').classList.add('fixed')
      : document.querySelector('html').classList.remove('fixed')
  }

  handleTalkClick() {
    const { talkDrawerOpen } = this.state
    this.setState({ talkDrawerOpen: !talkDrawerOpen }, () => {
      const html = document.querySelector('html')
      const clazz = 'calendly-open'
      if (html.classList && html.classList.contains(clazz)) {
        html.classList.remove(clazz)
      } else {
        html.classList.add(clazz)
      }
      this.checkFixedPage()
    })
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

  toggleModal = (boolean) =>
    this.setState((oldState) => {
      return {
        modalOpen: boolean,
      }
    })

  render() {
    const { location, pages, data } = this.props
    const { sideBarOpen, talkDrawerOpen } = this.state
    const calendly = data.allPagesYaml.edges[0].node

    return (
      <>
        <TalkDrawer
          onClick={this.handleTalkClick}
          visible={talkDrawerOpen}
          calendly={calendly}
        />
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
                        exact="true"
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
                <NativeButton
                  onClick={this.handleTalkClick}
                  style={{ fontWeight: '500', letterSpacing: '.025em' }}
                >
                  Talk to us
                </NativeButton>
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
        <GlobalStyle />
      </>
    )
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query calendlyQuery {
        allPagesYaml(filter: { id: { eq: "calendly" } }) {
          edges {
            node {
              closeDialog
            }
          }
        }
      }
    `}
    render={(data) => <Header data={data} {...props} />}
  />
)
