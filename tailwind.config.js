/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#33836e',
        brandWhite: '#ffffff',
        brandOrange: '#f6ad55',
        brandBlue: '#0000ff',
        'cs-blue': '#3b82f6',
        'cs-white': '#ffffff',
      },
      backgroundImage: {
        'radial-at-tl':
          'radial-gradient(at top left, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
