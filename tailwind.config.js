/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    '#0f172a',
        teal:    '#1a9e8a',
        'teal-dark': '#148f77',
        'teal-light': '#d1f2eb',
        'blue-accent': '#1d4ed8',
        defensive:   '#1d4e6b',
        potent:      '#148f77',
        harmonious:  '#1a9e8a',
        optimistic:  '#2ab09a',
        dire:        '#c0392b',
        pessimistic: '#e07070',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
