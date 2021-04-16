import React, { useState } from 'react'

const darkMode = {
  name: 'dark',
}

const lightMode = {
  name: 'light',
}

export const ThemeContext = React.createContext({
  selectedTheme: lightMode,
  switchTheme: (theme) => {},
})

export function ThemeProvider(props) {
  const [selectedTheme, setSelectedTheme] = useState(lightMode)

  const switchTheme = (theme) => {
    theme === 'dark' ? setSelectedTheme(darkMode) : setSelectedTheme(lightMode)
  }

  return (
    <ThemeContext.Provider value={{ selectedTheme, switchTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
