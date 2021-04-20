import React, { useState } from 'react'

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
  updateSystemTheme: (themeName) => {},
})

export function ThemeProvider(props) {
  const [selectedTheme, setSelectedTheme] = useState(systemMode)
  const [systemTheme, setSystemTheme] = useState(lightMode)

  const switchTheme = (theme) => {
    if (theme === 'dark') {
      setSelectedTheme(darkMode)
    } else if (theme == 'light') {
      setSelectedTheme(lightMode)
    } else {
      setSelectedTheme(systemMode)
    }
  }

  const updateSystemTheme = (themeName) => {
    if (themeName === 'dark') {
      setSystemTheme(darkMode)
    } else {
      setSystemTheme(lightMode)
    }
  }

  return (
    <ThemeContext.Provider
      value={{ selectedTheme, switchTheme, systemTheme, updateSystemTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
