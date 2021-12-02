const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D5080',
        'primary-dark': '#2B4558',
        'primary-bg': '#D9E7ED',
        action: '#1B6EBB',
        'action-light': '#5A93C8'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      width: {
        '108': '27.5rem',
        '33rem':'33rem',
        '34rem': '34.125rem'
      },
    },
  },
}
