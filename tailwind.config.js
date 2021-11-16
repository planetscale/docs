module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      white: 'var(--white)',
      black: 'var(--black)',
      transparent: 'transparent',
      gray: {
        50: 'var(--gray-050)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)'
      },
      red: {
        50: 'var(--red-050)',
        100: 'var(--red-100)',
        200: 'var(--red-200)',
        300: 'var(--red-300)',
        400: 'var(--red-400)',
        500: 'var(--red-500)',
        600: 'var(--red-600)',
        700: 'var(--red-700)',
        800: 'var(--red-800)',
        900: 'var(--red-900)'
      },
      orange: {
        50: 'var(--orange-050)',
        100: 'var(--orange-100)',
        200: 'var(--orange-200)',
        300: 'var(--orange-300)',
        400: 'var(--orange-400)',
        500: 'var(--orange-500)',
        600: 'var(--orange-600)',
        700: 'var(--orange-700)',
        800: 'var(--orange-800)',
        900: 'var(--orange-900)'
      },
      yellow: {
        50: 'var(--yellow-050)',
        100: 'var(--yellow-100)',
        200: 'var(--yellow-200)',
        300: 'var(--yellow-300)',
        400: 'var(--yellow-400)',
        500: 'var(--yellow-500)',
        600: 'var(--yellow-600)',
        700: 'var(--yellow-700)',
        800: 'var(--yellow-800)',
        900: 'var(--yellow-900)'
      },
      green: {
        50: 'var(--green-050)',
        100: 'var(--green-100)',
        200: 'var(--green-200)',
        300: 'var(--green-300)',
        400: 'var(--green-400)',
        500: 'var(--green-500)',
        600: 'var(--green-600)',
        700: 'var(--green-700)',
        800: 'var(--green-800)',
        900: 'var(--green-900)'
      },
      blue: {
        50: 'var(--blue-050)',
        100: 'var(--blue-100)',
        200: 'var(--blue-200)',
        300: 'var(--blue-300)',
        400: 'var(--blue-400)',
        500: 'var(--blue-500)',
        600: 'var(--blue-600)',
        700: 'var(--blue-700)',
        800: 'var(--blue-800)',
        900: 'var(--blue-900)'
      },
      purple: {
        50: 'var(--purple-050)',
        100: 'var(--purple-100)',
        200: 'var(--purple-200)',
        300: 'var(--purple-300)',
        400: 'var(--purple-400)',
        500: 'var(--purple-500)',
        600: 'var(--purple-600)',
        700: 'var(--purple-700)',
        800: 'var(--purple-800)',
        900: 'var(--purple-900)'
      }
    },
    extend: {
      animation: {
        'fade-in-up': 'fade-in-up 1500ms cubic-bezier(.5,0,0,1) forwards',
        'scale-fade-in': 'scale-fade-in 500ms cubic-bezier(.5,0,0,1) forwards'
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        green: 'var(--bg-green)',
        'green-light': 'var(--bg-green-light)'
      },
      borderColor: {
        DEFAULT: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        green: 'var(--border-green)',
        'green-light': 'var(--border-green-light)'
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
        full: '9999px'
      },
      boxShadow: {
        'dark-xl':
          '0px 100px 80px rgba(0, 0, 0, 0.158), 0px 42px 33px rgba(0, 0, 0, 0.16), 0px 22px 18px rgba(0, 0, 0, 0.165), 0px 12.5px 10px rgba(0, 0, 0, 0.168), 0px 6.5px 5px rgba(0, 0, 0, 0.171), 0px 2.5px 2px rgba(0, 0, 0, 0.185)'
      },
      cursor: {
        'col-resize': 'col-resize'
      },
      fill: {
        'bg-primary': 'var(--bg-primary)',
        'blue-light': 'var(--graph-blue-light)',
        'blue-dark': 'var(--graph-blue-dark)',
        'green-light': 'var(--graph-green-light)',
        'green-dark': 'var(--graph-green-dark)'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%'
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        mono: ['ui-monospace', 'SF-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace']
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '18px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px'
      },
      fontWeight: {
        // We use normal, medium, and semibold only.
        // Lighter and heavier are capped to these.
        hairline: 400,
        'extra-light': 400,
        thin: 400,
        light: 400,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 600,
        extrabold: 600,
        'extra-bold': 600,
        black: 600
      },
      height: {
        button: '34px',
        'button-sm': '32px',
        'button-lg': '48px',
        'indicator-dot': '6px',
        'nav-link': '32px',
        badge: '22px'
      },
      inset: {
        '-2.5': '-20px'
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10%)'
          }
        },
        'scale-fade-in': {
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      letterSpacing: {
        tight: '-.2px',
        wide: '.2px'
      },
      scale: {
        70: '.7',
        80: '.8',
        90: '.9'
      },
      spacing: {
        xs: '2px',
        sm: '4px',
        1: '8px',
        1.5: '12px',
        2: '16px',
        2.5: '20px',
        3: '24px',
        4: '32px',
        4.5: '36px',
        5: '40px',
        6: '48px',
        7: '56px',
        8: '64px',
        9: '72px',
        10: '80px',
        11: '88px',
        12: '96px',
        '-sm': '-4px'
      },
      stroke: {
        border: 'var(--graph-border)',
        blue: 'var(--graph-blue-dark)'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        blue: 'var(--text-blue)',
        'blue-dark': 'var(--text-blue-dark)',
        green: 'var(--text-green)',
        orange: 'var(--text-orange)',
        red: 'var(--text-red)',
        'red-disabled': 'var(--text-red-disabled)',
        purple: 'var(--text-purple)',
        'purple-light': 'var(--purple-400)'
      },
      width: {
        'icon-button': '34px',
        'indicator-dot': '6px'
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ['dark'],
      fontWeight: ['group-hover'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      borderWidth: ['hover']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
