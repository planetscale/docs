import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rgba } from 'polished'
import { Button } from '../components/Common.Button'
import { HeaderWrapper } from '../components/Layout.Wrapper'
import { Modal } from '../components/Common.Modal'
import { EmailForm } from './Home.EmailForm'
import { H3 } from '../components/Typography.Headings'

import { media } from '../styles/media'

import logo from '../../static/img/logo.png'
import background from '../images/hero/home-bg.svg'

const _Header = styled.header`
  width: 100%;
  z-index: 1337;
  position: absolute;

  ${media.tablet`
    width: 100%;
    margin: 0 auto;
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
    height: 110vh;
    margin-top: -5vh;
    background-image: url(${background});
    background-size: cover;
    transition: all 250ms;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')} ;
    right: ${(props) => (props.visible ? '0vw' : '-100vw')} ;
    top: 0;
    opacity: ${(props) => (props.visible ? '1' : '0')} ;
  `};
`

const NavList = styled.ol`
  padding: 0;
  flex-grow: 2;
  text-align: right;

  ${media.tablet`
    flex-wrap: wrap;
    padding-bottom: 10em;
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
    padding-top: 1em;
    font-size: 2.5em;
    margin-left: 0em;
  `};
`

const MobileHeaderButton = styled.div`
  color: white;
  display: none;
  font-size: 1.5em;
  font-weight: 800;
  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;
  z-index: 1338;
  user-select: none;

  ${media.tablet`
    display: inline-block;
    position: ${(props) => (props.visible ? 'fixed' : 'absolute')} ;
  `};
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
  position: absolute;
  position: ${(props) => (props.visible ? 'fixed' : 'absolute')};
  top: 25px;
  left: 20px;
  z-index: 1338;

  ${media.tablet`
    display: block;
  `};
`

const RightSide = styled.div`
  ${media.desktop`
    display: none;
  `};
`

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideBarOpen: false,
      modalOpen: false,
    }
  }

  toggleSidebar = (boolean) =>
    this.setState((oldState) => {
      document.body.setAttribute(
        'data-sidebar-open',
        boolean || !oldState.sideBarOpen
      )

      return {
        sideBarOpen: !oldState.sideBarOpen,
      }
    })

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
                <Button onClick={this.toggleModal}> Learn More </Button>
                <Modal
                  visible={modalOpen}
                  onClose={() => this.toggleModal(false)}
                >
                  <H3>
                    Get in touch to see how we can help you operationalize
                    Vitess.
                  </H3>
                  <EmailForm onDone={() => this.toggleModal(false)} />
                </Modal>
              </RightSide>
            </Nav>
          </HeaderWrapper>

          <MobileHeaderButton
            visible={sideBarOpen}
            onClick={this.toggleSidebar}
          >
            {' '}
            {sideBarOpen ? 'Menu ✕' : 'Menu ☰'}{' '}
          </MobileHeaderButton>
          <Link to={'/'} activeStyle={{ opacity: 1 }}>
            <MobileLogo src={logo} visible={sideBarOpen} />
          </Link>
        </_Header>
      </React.Fragment>
    )
  }
}
