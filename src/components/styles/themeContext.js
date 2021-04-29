import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import codeBlockThemeLight from 'prism-react-renderer/themes/vsLight'
import exoDark from './exoDark'

const systemMode = {
  name: 'system',
  label: 'System',
}

const darkMode = {
  name: 'dark',
  label: 'Dark',
  codeTheme: exoDark,
}

const lightMode = {
  name: 'light',
  label: 'Light',
  codeTheme: codeBlockThemeLight,
}

export const ThemeContext = React.createContext()

export function ThemeProvider(props) {
  const availableThemes = [systemMode, darkMode, lightMode]
  const [selectedMode, setSelectedMode] = useState(systemMode)
  const [activeSystemMode, setActiveSystemMode] = useState(lightMode)
  const [cookies, setCookie, removeCookie] = useCookies(['theme'])
  let root

  useEffect(() => {
    root = document.querySelector('html')

    if (cookies.theme) {
      switchTheme(cookies.theme)
    }

    if (selectedMode.name === systemMode.name) {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setActiveSystemMode(darkMode)
      } else {
        setActiveSystemMode(lightMode)
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (selectedMode.name === systemMode.name) {
          const newColorScheme = e.matches ? darkMode.name : lightMode.name
          if (newColorScheme === darkMode.name) {
            setActiveSystemMode(darkMode)
          } else {
            setActiveSystemMode(lightMode)
          }
        }
      })
  })

  const switchTheme = (theme) => {
    if (theme === darkMode.name) {
      root.classList.remove(lightMode.name)
      root.classList.add(darkMode.name)
      setSelectedMode(darkMode)
      setCookie('theme', darkMode.name)
    } else if (theme === lightMode.name) {
      root.classList.remove(darkMode.name)
      root.classList.add(lightMode.name)
      setSelectedMode(lightMode)
      setCookie('theme', lightMode.name)
    } else {
      root.classList.remove(darkMode.name)
      root.classList.remove(lightMode.name)
      setSelectedMode(systemMode)
      setCookie('theme', systemMode.name)
    }
  }

  const getSelectedMode = () => {
    return selectedMode
  }

  const getActiveMode = () => {
    return selectedMode.name === 'system'
      ? activeSystemMode.name === 'dark'
        ? darkMode
        : lightMode
      : selectedMode.name === 'dark'
      ? darkMode
      : lightMode
  }

  return (
    <ThemeContext.Provider
      value={{
        availableThemes,
        switchTheme,
        getSelectedMode,
        getActiveMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
