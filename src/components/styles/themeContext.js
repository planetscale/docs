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
  switchTheme: (themeName) => {},
})

export function ThemeProvider(props) {
  const [selectedTheme, setSelectedTheme] = useState(systemMode)

  const switchTheme = (theme) => {
    if (theme === 'dark') {
      setSelectedTheme(darkMode)
    } else if (theme == 'light') {
      setSelectedTheme(lightMode)
    } else {
      setSelectedTheme(systemMode)
    }
  }

  return (
    <ThemeContext.Provider value={{ selectedTheme, switchTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
