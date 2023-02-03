const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      'dark-high': '#0c1518',
      dark: '#39393b',
      'dark-low': '#f1f1f1',
      blue: '#4831D4',
      green: '#15DB95',
      yellow: '#EED971FF',
      red: '#EE4E34',
    },
    fontSize: {
      ...defaultTheme.fontSize,
      '10xl': '9rem',
      '11xl': '11rem',
    },

    fontFamily: {
      sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    extend: {
      borderRadius: {
        '2xs': '2px',
        xs: '3px',
        sm: '5px',
        md: '6px',
        DEFAULT: '8px',
        lg: '10px',
        xl: '12px',
      },
      maxWidth: {
        '7xl': '72rem',
        '8xl': '80rem',
        '9xl': '90rem',
        '10xl': '100rem',
        '11xl': '110rem',
      },
      maxHeight: (theme, { negative }) => {
        return {
          auto: 'auto',
          ...theme('maxWidth'),
          ...theme('spacing'),
          ...negative(theme('spacing')),
        }
      },
      minWidth: (theme, { negative }) => {
        return {
          ...theme('spacing'),
          ...negative(theme('spacing')),
        }
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls((decl) => {
            decl.important = true
          })
        })
      })
    }),
  ],
}
