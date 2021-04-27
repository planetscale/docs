import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const systemMode = {
  name: 'system',
}

const darkMode = {
  name: 'dark',
}

const lightMode = {
  name: 'light',
}

export const ThemeContext = React.createContext({
  selectedTheme: lightMode,
  systemTheme: lightMode,
  switchTheme: (themeName) => {},
})

export function ThemeProvider(props) {
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
        setSystemTheme(darkMode.name)
      } else {
        setSystemTheme(lightMode.name)
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (selectedTheme.name === systemMode.name) {
          const newColorScheme = e.matches ? darkMode.name : lightMode.name
          if (newColorScheme === darkMode.name) {
            setSystemTheme(darkMode.name)
          } else {
            setSystemTheme(lightMode.name)
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

  return (
    <ThemeContext.Provider value={{ selectedTheme, switchTheme, systemTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
