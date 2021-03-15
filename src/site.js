const theme = {
  sizes: {
    tablet: 900,
    phone: 750,
    maxWidth: '1170px',
  },

  colorMode: {
    light: {
      background1: '#fff',
      background2: '#fcfcfc',
      foreground1: '#000',
      foreground2: '#555',
      accent: '#ebecf0',
      accent2: '#ccc',
      link: '#007BC7',
      text: '#555',
      codeblock: 'rgb(42, 53, 70)',
      brightness: 'brightness(100%)',
      shadow1:
        '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 13px rgba(0, 0, 0, 0.08)',
      logo: 'url("/logo-docs_light.svg")',
    },
    dark: {
      background1: '#1A1B21',
      background2: '#1A1B21',
      foreground1: 'rgba(255, 255, 255, 0.9)',
      foreground2: '#aaa',
      accent: '#393941',
      accent2: '#333',
      link: '#009AFA',
      text: '#ccc',
      codeblock: 'rgb(14,22,34)',
      brightness: 'brightness(85%)',
      shadow1:
        '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 13px rgba(0, 0, 0, 0.08)',
      logo: 'url("/logo-docs_dark.svg")',
    },
  },
}

export const sizes = theme.sizes

export function switchTheme(themeName) {
  let root = typeof document !== 'undefined' && document.documentElement
  root.style.setProperty(
    '--background1',
    theme.colorMode[themeName].background1
  )
  root.style.setProperty(
    '--background2',
    theme.colorMode[themeName].background2
  )
  root.style.setProperty(
    '--foreground1',
    theme.colorMode[themeName].foreground1
  )
  root.style.setProperty(
    '--foreground2',
    theme.colorMode[themeName].foreground2
  )
  root.style.setProperty('--accent', theme.colorMode[themeName].accent)
  root.style.setProperty('--accent2', theme.colorMode[themeName].accent2)
  root.style.setProperty('--link', theme.colorMode[themeName].link)
  root.style.setProperty('--text', theme.colorMode[themeName].text)
  root.style.setProperty('--codeblock', theme.colorMode[themeName].codeblock)
  root.style.setProperty('--brightness', theme.colorMode[themeName].brightness)
  root.style.setProperty('--shadow1', theme.colorMode[themeName].shadow1)
  root.style.setProperty('--logo', theme.colorMode[themeName].logo)
}
