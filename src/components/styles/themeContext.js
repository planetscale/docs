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

export const ThemeContext = React.createContext({
  availableThemes: [],
  selectedTheme: lightMode,
  systemTheme: lightMode,
  switchTheme: (themeName) => {},
  getActiveMode: () => {},
  getActiveDecomposedMode: () => {},
})

export function ThemeProvider(props) {
  const availableThemes = [systemMode, darkMode, lightMode]
  const [selectedTheme, setSelectedTheme] = useState(systemMode)
  const [systemTheme, setSystemTheme] = useState(lightMode)
  const [cookies, setCookie, removeCookie] = useCookies(['theme'])
  let root

  useEffect(() => {
    root = document.querySelector('html')

    if (cookies.theme) {
      switchTheme(cookies.theme)
    }

    if (selectedTheme.name === systemMode.name) {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setSystemTheme(darkMode)
      } else {
        setSystemTheme(lightMode)
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (selectedTheme.name === systemMode.name) {
          const newColorScheme = e.matches ? darkMode.name : lightMode.name
          if (newColorScheme === darkMode.name) {
            setSystemTheme(darkMode)
          } else {
            setSystemTheme(lightMode)
          }
        }
      })
  })

  const switchTheme = (theme) => {
    if (theme === darkMode.name) {
      root.classList.remove(lightMode.name)
      root.classList.add(darkMode.name)
      setSelectedTheme(darkMode)
      setCookie('theme', darkMode.name)
    } else if (theme == lightMode.name) {
      root.classList.remove(darkMode.name)
      root.classList.add(lightMode.name)
      setSelectedTheme(lightMode)
      setCookie('theme', lightMode.name)
    } else {
      root.classList.remove(darkMode.name)
      root.classList.remove(lightMode.name)
      setSelectedTheme(systemMode)
      setCookie('theme', systemMode.name)
    }
  }

  const getActiveMode = () => {
    return selectedTheme
  }

  const getActiveDecomposedMode = () => {
    return selectedTheme.name === 'system'
      ? systemTheme.name === 'dark'
        ? darkMode
        : lightMode
      : selectedTheme.name === 'dark'
      ? darkMode
      : lightMode
  }

  return (
    <ThemeContext.Provider
      value={{
        availableThemes,
        switchTheme,
        getActiveMode,
        getActiveDecomposedMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
