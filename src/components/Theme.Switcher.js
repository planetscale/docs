import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { switchTheme } from '../site.js'
import icon_sun from '../../static/icons/sun.svg'
import icon_moon from '../../static/icons/moon.svg'

const ToggleSwitch = styled.div`
  border-radius: 99px;
  background-color: var(--accent);
  width: 48px;
  height: 24px;
  margin-right: 1.5em;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 99px;
    width: 20px;
    height: 20px;
    background-color: var(--background2);
    background-image: url(${icon_sun});
    background-repeat: no-repeat;
    background-size: contain;
    top: 2px;
    left: 26px;
    transition: left var(--buttonHoverDelay) ease;
  }

  &:hover {
    box-shadow: inset 0 0 16px var(--accent2);
    cursor: pointer;

    &::before {
      box-shadow: var(--shadow1);
    }
  }

  &.dark {
    &::before {
      background-image: url(${icon_moon});
      left: 2px;
    }
  }

  ${media.phone`
    box-shadow: none;
  `}
`

class ThemeSwitcher extends Component {
  constructor(props) {
    super(props)

    this.toggleSwitchRef = React.createRef()
    this.state = {
      isDarkThemeSet: false,
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.state.isDarkThemeSet = true
      switchTheme('dark')
    }
  }

  toggleTheme = (boolean) => {
    this.setState((oldState) => {
      if (!oldState.isDarkThemeSet) {
        switchTheme('dark')
      } else {
        switchTheme('light')
      }

      return {
        isDarkThemeSet:
          typeof boolean === 'boolean' ? boolean : !oldState.isDarkThemeSet,
      }
    })
  }

  render() {
    const { isDarkThemeSet } = this.state

    return (
      <ToggleSwitch
        ref={this.toggleSwitchRef}
        className={isDarkThemeSet ? 'dark' : ''}
        onClick={this.toggleTheme}
      ></ToggleSwitch>
    )
  }
}

export default ThemeSwitcher
